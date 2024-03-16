import User from '../models/userModel.js';
import { google } from 'googleapis';
import Oauth2ClientManager from '../utils/oauth2ClientManager.js';

export const findOrCreateUser = async (email) => {
    try {
        let user = await User.findOne({ email });

        if (user) {
            return user;
        }
        user = await User.create({ email, activeCalendars: [] });
        return user;
    } catch (error) {
        throw error;
    }
}

export const getUserEmail = async () => {
    return new Promise((resolve, reject) => {
        google.people('v1').people.get({
            resourceName: 'people/me',
            personFields: 'emailAddresses',
            auth: Oauth2ClientManager.getInstance().getOauth2Client(),
        }, (err, response) => {
            if (err) {
                console.error('Error fetching profile', err);
                throw err;
            }

            const email = response.data.emailAddresses[0].value;
            resolve(email);
        });
    })

}



export const checkIfCalendarActive = async (calendarId): Promise<boolean> => {
    try {
        const email = await getUserEmail();
        const user = await findOrCreateUser(email);
        return user.activeCalendars.includes(calendarId);

    } catch (err) {
        throw err;
    }
}

export const setCalendarActive = async (calendarId: string) => {
    try {
        const email = await getUserEmail();
        const user = await findOrCreateUser(email);
        if (user.activeCalendars.includes(calendarId)) {
            user.activeCalendars = user.activeCalendars.filter(id => id !== calendarId);
            await User.updateOne({ activeCalendars: user.activeCalendars });
        } else {
            user.activeCalendars.push(calendarId);
            await User.updateOne({ activeCalendars: user.activeCalendars });
        }
    } catch (err) {
        throw err;
    }
}

export const getActiveCalendars = async () => {
    try {
        const email = await getUserEmail();
        const user = await findOrCreateUser(email);
        return user.activeCalendars;
    } catch (err) {
        throw err;
    }
}

