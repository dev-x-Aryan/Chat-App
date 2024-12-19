import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message: "You are not logged in"})

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded) return res.status(401).json({message: "Unauthorized Access"})

        const user = await User.findById(decoded.userId).select("-password")
        if(!user) return res.status(404).json({message: "User not found!"})
        
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
}