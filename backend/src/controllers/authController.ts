import { Request, Response } from 'express';
import { google } from 'googleapis';
import * as userService from '../services/userService.js';
import Oauth2ClientManager from '../utils/oauth2ClientManager.js';
import { oauth2 } from 'googleapis/build/src/apis/oauth2/index.js';


export const getAuthURL = (req: Request, res: Response) => {
    const oauth2Client = Oauth2ClientManager.getInstance().getOauth2Client();
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/calendar.readonly',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(' ')
    });

    res.json({ url });
}

export const handleCallback = (req: Request, res: Response) => {
    const code = req.query.code;
    const oauth2Client = Oauth2ClientManager.getInstance().getOauth2Client();
    oauth2Client.getToken(code as string, (err, tokens) => {
        if (err) {
            console.error('Couldn\'t get token', err);
            res.send('Error');
            return;
        }
        Oauth2ClientManager.getInstance().setCredentials(tokens);

        google.people('v1').people.get({
            resourceName: 'people/me',
            personFields: 'emailAddresses',
            auth: oauth2Client,
        }, (err, response) => {

            if (err) {
                console.error('Error fetching profile', err);
                res.send('Error');
                return;
            }
            const email = response.data.emailAddresses[0].value;
            userService.findOrCreateUser(email);
        }
        )
        res.redirect('http://localhost:4200');
    });

}

export const isLogged = (req: Request, res: Response) => {
    const oauth2 = Oauth2ClientManager.getInstance().getOauth2Client();
    if (oauth2.credentials) {
        res.json({ isLogged: true });
    } else {
        res.json({ isLogged: false });
    }
}
