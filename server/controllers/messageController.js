import { json } from "express";
import MessageModel from "../models/MessageModel.js";
import ConversationModel from "../models/ConversationModel.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

const sendMessageHandler = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { content } = req.body;
        const senderId = req.user._id; //we added user field in protectRoute
        // check if there is a conversation already existed between two users
        let conversation = await ConversationModel.findOne({
            participants: {
                $all: [receiverId, senderId]
            }
        }); //find one conversation that contains both of these two ids
        // if no conversation, create a new one
        if (!conversation) {
            conversation = await ConversationModel.create({
                participants: [receiverId, senderId],
            });
        };
        const newMsg = new MessageModel({
            senderId,
            receiverId,
            content
        });
        if (newMsg) {
            conversation.messages.push(newMsg._id); 
        };
        //await newMsg.save();
        //await conversation.save();
        //improve codes to run in parallel:
        await Promise.all([newMsg.save(), conversation.save()]);

        //Socket IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            //only emit to a specific user
            io.to(receiverSocketId).emit('newMessage', newMsg);

        };
        res.status(201).json(newMsg);
    } catch (error) {
        console.log('Error in sendMessageHandler')
        res.status(500).json({ error: error.message })
    };
};

const getMessageHandler = async (req, res) => {
    try {
        const { id: targetUserId } = req.params;
        const senderId = req.user._id;
        //get conversation (messages only have id arr, we need to map to each MessageModel)
        const conversation = await ConversationModel.findOne({
            participants:
                { $all: [targetUserId, senderId] }
        })
            .populate('messages'); //mapping each msgId in arr to actual message doc obj
        if (!conversation) return res.status(200).json([]); //return empty message arr if no conversation yet

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log('Error in getMessageHandler')
        res.status(500).json({ error: error.message })
    }
}

export { sendMessageHandler, getMessageHandler };