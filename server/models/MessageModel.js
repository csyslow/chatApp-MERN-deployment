import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, //a reference of user's _id
        ref: "UserModel",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
    { timestamps: true });

const MessageModel = model("messages", messageSchema);

export default MessageModel;