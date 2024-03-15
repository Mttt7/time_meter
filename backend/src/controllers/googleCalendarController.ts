import { Request, Response } from 'express';
import { google } from 'googleapis';
import Oauth2ClientManager from '../utils/oauth2ClientManager.js';

export const getCalendars = async (req: Request, res: Response) => {
    const oauth2Client = Oauth2ClientManager.getInstance().getOauth2Client();
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    calendar.calendarList.list({}, (err, response) => {
        if (err) {
            // Handle error if the API request fails
            console.error('Error fetching calendars', err);
            res.end('Error!');
            return;
        }
        // Send the list of calendars as JSON
        const calendars = response.data.items;
        res.json(calendars);
    });
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
            // Handle error if the API request fails
            console.error('Can\'t fetch events');
            res.send('Error');
            return;
        }
        // Send the list of events as JSON
        const events = response.data.items;
        res.json(events);
    });
}