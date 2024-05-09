import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();

//add socket server on top of express server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST']
    }
});

const userSocketMap = {}; // {userId: socketId}

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on('connection', (socket) => {
    console.log('user connected, socket id:', socket.id)

    const userId = socket.handshake.query.userId;
    if (userId != 'undefined') userSocketMap[userId] = socket.id;
    //io.emit() send events to all connected users
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
})

io.on('disconnect', (socket) => {
    console.log('user disconnected, socket id:', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
})
export {app, io, server, getReceiverSocketId};