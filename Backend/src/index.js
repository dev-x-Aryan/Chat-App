import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './database/db.js';
import cookieParser from "cookie-parser"; 
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
const app = express();
dotenv.config();


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoute);
app.use("/api/message",messageRoute)

app.listen(5001,()=>{
    console.log("Server is listening at port 5001");
    connectDB();
})