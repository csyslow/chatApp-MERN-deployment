import express, { json } from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './socket/socket.js';
import path from 'path';
// const app = express();
dotenv.config(); //makes .env file usable

const port = process.env.PORT || 8000;
const __dirname = path.resolve();

app.use(json()); //parse JSON request payload from req.body
app.use(cookieParser()); //parse incoming cookies in req.cookies
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));



app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/user', userRoutes);

//serve bundled dist as static resources
app.use(express.static(path.join(__dirname, "/client/dist")));
//any GET request except requests in paths above will 
//find index.html (必须写在router之后，否则会覆盖)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        server.listen(port, () =>{
            console.log(`Connected to PORT ${port}`);
        })
    })
    .catch((err) => {
        console.log(err);
    });

mongoose.connection.once("open", () => {
    console.log('Connected to MongoDB');
});