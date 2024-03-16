import { Request, Response } from 'express';
import { google } from 'googleapis';
import Oauth2ClientManager from '../utils/oauth2ClientManager.js';
import * as userService from '../services/userService.js';

export const getCalendars = async (req: Request, res: Response) => {
    const oauth2Client = Oauth2ClientManager.getInstance().getOauth2Client();
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    calendar.calendarList.list({}, async (err, response) => {
        if (err) {
            console.error('Error fetching calendars', err);
            res.end('Error!');
            return;
        }
        let calendars = response.data.items;

        calendars = await Promise.all(calendars.map(async (calendar: any) => {
            let isActive = await userService.checkIfCalendarActive(calendar.id);
            return {
                ...calendar,
                active: isActive
            }
        }))

        res.json(calendars);
    });
}

export const getActiveCalendars = async (req: Request, res: Response) => {
    try {

        const activeCalendarIds = await userService.getActiveCalendars();

        const oauth2Client = Oauth2ClientManager.getInstance().getOauth2Client();
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        const response = await calendar.calendarList.list({});
        let calendars = response.data.items.filter((calendar: any) => activeCalendarIds.includes(calendar.id));

        calendars = calendars.map((calendar: any) => ({ ...calendar, active: true }));

        res.json(calendars);
    } catch (err) {
        console.error('Error fetching active calendars', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const getEvents = async (req: Request, res: Response) => {
    const oauth2Client = Oauth2ClientManager.getInstance().getOauth2Client();
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const calendarId = req.query.calendar ? String(req.query.calendar) : 'primary';

    calendar.events.list({
        calendarId,
        timeMin: (new Date()).toISOString(),
        maxResults: 15,
        singleEvents: true,
        orderBy: 'startTime'
    }, (err, response) => {
        if (err) {
            console.error('Can\'t fetch events');
            res.send('Error');
            return;
        }
        const events = response.data.items;
        res.json(events);
    });
}

export const setCalendarActive = async (req: Request, res: Response) => {
    const calendarId = req.query.calendarId;
    if (!calendarId) {
        res.status(400).send('Calendar ID is required');
        return;
    }
    try {
        await userService.setCalendarActive(String(calendarId));
        res.send('Success');
    } catch (err) {
        console.error('Error setting calendar active', err);
        res.send('Error');
    }
}