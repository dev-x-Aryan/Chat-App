import {Server} from "socket.io"
import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    }
})

const userSocketMap = {} //{userId: socketId}
//listening to events
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId
    if (!userId) {
        console.log("⚠️ Warning: No userId received!");
    } else {
        console.log(`User ${userId} mapped to socket ${socket.id}`);
        userSocketMap[userId] = socket.id;
    }

    //online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    //real time messaging
    socket.on("sendMessage", ({ senderId, receiverId, text, image }) => {
        const receiverSocketId = userSocketMap[receiverId];
        
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", {
                senderId,
                text,
                image,
            });
        }
    });
});

export {io, app, server}