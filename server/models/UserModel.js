import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePicUrl: {
        type: String,
        default: ""
    },
},
    { timestamps: true });

//create model
const UserModel = model('users', userSchema);

export default UserModel;