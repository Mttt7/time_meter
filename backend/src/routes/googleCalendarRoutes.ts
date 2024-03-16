import express from 'express';
import * as googleCalendarController from '../controllers/googleCalendarController.js';
const router = express.Router();

router.route('/calendars')
    .get(googleCalendarController.getCalendars)
    .patch(googleCalendarController.setCalendarActive)

router.route('/calendars/active')
    .get(googleCalendarController.getActiveCalendars)

router.route('/calendars/:calendarId')

router.route('/calendars/:calendarId/:scope/:date')
    .get(googleCalendarController.getTime)


router.route('/events')
    .get(googleCalendarController.getEvents)

export default router;

