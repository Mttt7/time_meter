import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import googleCalendarRoutes from './routes/googleCalendarRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Initialize Express app
const app = express();

console.log(process.env.DATABASE);

//Initialize Mongoose
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {})
    .then(conn => { console.log('DB connection successful') })


// Middlewares
app.use(cors());


//Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/googleCalendar', googleCalendarRoutes);

// Start the server
app.listen(3000, () => console.log('Server running at 3000'));