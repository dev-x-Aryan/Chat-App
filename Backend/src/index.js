import express, { urlencoded } from 'express';
import dotenv from "dotenv";
import { connectDB } from './database/db.js';
import cookieParser from "cookie-parser"; 
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
import cors from "cors"
import { app, server } from './utils/socket.js';

dotenv.config();


app.use(express.json({limit: '10mb'}));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '10mb', extended: true }))

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


app.use("/api/auth",authRoute);
app.use("/api/message",messageRoute)



server.listen(5001,()=>{
    console.log("Server is listening at port 5001");
    connectDB();
})