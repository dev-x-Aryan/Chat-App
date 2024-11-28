import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './database/db.js';
const app = express();
dotenv.config();


app.use(express.json());
import authRoute from "./routes/auth.route.js"
app.use("/api/auth",authRoute);

app.listen(5001,()=>{
    console.log("Server is listening at port 5001");
    connectDB();
})