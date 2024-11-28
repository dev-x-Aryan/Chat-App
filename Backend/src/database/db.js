import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database connected successfully: ${con.connection.host}`)
    } catch (error) {
        console.log("An error occured", error);
    }
}