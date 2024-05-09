import express from 'express';
import { getMessageHandler, sendMessageHandler } from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

//check if user has logged in (protectRoute middleware)
router.post('/send/:id', protectRoute, sendMessageHandler); //send msg to :id (reveiverId)
router.get('/:id', protectRoute, getMessageHandler); //get the msg of :id that we gonna chat with

export default router;