require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

//
const User = require('./models/userModel');
const findOrCreateUser = require('./services/userService');


const mongoose = require('mongoose');

// Initialize Express app
const app = express();

//Initialize Mongoose
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(conn => { console.log('DB connection successful') })



app.use(cors());

// Set up Google OAuth2 client with credentials from environment variables
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.SECRET_ID,
    process.env.REDIRECT
);

// Route to initiate Google OAuth2 flow
app.route('/api/v1/')
    .get((req, res) => {
        // Generate the Google authentication URL
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/calendar.readonly',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile'
            ].join(' ')
        });
        // Redirect the user to Google's OAuth 2.0 server

        res.json({ url });
    });


// Route to handle the OAuth2 callback
app.get('/redirect', (req, res) => {
    // Extract the code from the query parameter
    const code = req.query.code;
    // Exchange the code for tokens
    oauth2Client.getToken(code, (err, tokens) => {
        if (err) {
            // Handle error if token exchange fails
            console.error('Couldn\'t get token', err);
            res.send('Error');
            return;
        }
        // Set the credentials for the Google API client
        oauth2Client.setCredentials(tokens);

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

            console.log("EMAIL:", response.data.emailAddresses[0].value);
            const email = response.data.emailAddresses[0].value;
            findOrCreateUser(email);
        }


        )
        // Notify the user of a successful login
        res.send('Successfully logged in');
    });
});

// Route to list all calendars
app.route('/api/v1/calendars')
    .get((req, res) => {
        // Create a Google Calendar API client
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        // List all calendars
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
    });

// Route to list events from a specified calendar
app.route('/api/v1/events')
    .get((req, res) => {
        // Get the calendar ID from the query string, default to 'primary'
        const calendarId = req.query.calendar ?? 'primary';
        // Create a Google Calendar API client
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        // List events from the specified calendar
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
    });

app.get('/token', (req, res) => {
    res.json(oauth2Client.credentials);
})
// Start the Express server
app.listen(3000, () => console.log('Server running at 3000'));