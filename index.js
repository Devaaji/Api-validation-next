import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';

dotenv.config();
const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to Mongoose')
    } catch (error) {
        throw error
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!');
});
mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!');
});
app.get('/', (req, res) => {
    res.send('Hello World!');
})

//MIDLEWARE
app.use(cors());
app.use(express.json());

//API ROUTING
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);

app.listen(process.env.PORT, () => {
    connect()
    console.log(`Conneted on port ${process.env.PORT}`)
});
