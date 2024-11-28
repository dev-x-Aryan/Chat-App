import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    text:{
        type: String,
    },
    sender:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export const Message = mongoose.model("Message",messaegSchema);