import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtToken.js";

const signup = async(req,res)=>{
   try {
     const {name, email, password} = req.body;
     if ([name, email, password].some((field) => field?.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" })
     }
 
     if(password.length<8){
        return res.status(400).json({ message: "Password must be atleast 8 characters long" })
     }
 
     const existingUser = await User.findOne({email})
     if(existingUser){
        return res.status(409).json({ message: "User with the same email already exists" })
     }
 
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)
 
     const newUser = await User.create({
         name,
         email,
         password: hashedPassword
     })
 
     if(newUser){
         generateToken(newUser._id,res)
         await newUser.save()
         res.status(201).json({ message: "User registered successfully", user: newUser })
     }else{
         res.status(400).json({message: "Unvalid user data"})
     }
   } catch (error) {
    console.log(error)
    res.status(500).json({message: "An error occurred"})
   }
}

const login=(req,res)=>{
    res.send("Login page")
}

const logout = (req,res)=>{
    res.send("Logout page")
}

export {signup, login, logout}