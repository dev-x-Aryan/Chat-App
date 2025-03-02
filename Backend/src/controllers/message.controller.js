import { User } from "../models/user.model.js"
import { Message } from "../models/message.model.js"
import cloudinary from "../utils/cloudinary.js";


const getUsers = async(req,res)=>{
    try {
        const myId = req.user._id
        const users = await User.find({ _id: { $ne: myId } }).select("-password")
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
}

const getMessage = async(req,res)=>{
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
    
        const messages = await Message.find({
          $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
          ],
        }).sort({ createdAt: 1 })
    
        res.status(200).json(messages);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      }
}

const sendMessage = async(req,res)=>{
    try {
        console.log("🔹 Request received from:", req.user?._id);
        console.log("🔹 Sending to:", req.params.id);
        console.log("🔹 Message:", req.body.text);
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
        createdAt: new Date(),
        });

        await newMessage.save();
        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
}

export {getUsers, getMessage, sendMessage}