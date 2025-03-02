import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    text:{
        type: String,
    },
    image:{
        type: String,
    },
    senderId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

export const Message = mongoose.model("Message",messageSchema);