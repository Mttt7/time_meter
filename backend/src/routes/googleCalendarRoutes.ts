import express from 'express';
import * as googleCalendarController from '../controllers/googleCalendarController.js';
const router = express.Router();

router.route('/calendars')
    .get(googleCalendarController.getCalendars)

router.route('/events')
    .get(googleCalendarController.getEvents)

export default router;

