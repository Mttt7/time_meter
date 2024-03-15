import { Request, Response } from 'express';
import { google } from 'googleapis';
import * as userService from '../services/userService.js';
import Oauth2ClientManager from '../utils/oauth2ClientManager.js';


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
    // Extract the code from the query parameter
    const code = req.query.code;
    // Exchange the code for tokens
    const oauth2Client = Oauth2ClientManager.getInstance().getOauth2Client();
    oauth2Client.getToken(code as string, (err, tokens) => {
        if (err) {
            // Handle error if token exchange fails
            console.error('Couldn\'t get token', err);
            res.send('Error');
            return;
        }
        // Set the credentials for the Google API client


        //oauth2Client.setCredentials(tokens);

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
        // Notify the user of a successful login
        res.send('Successfully logged in');
    });

}