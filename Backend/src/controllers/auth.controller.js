import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "../utils/cloudinary.js";

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
         res.status(400).json({message: "Invalid user data"})
     }
   } catch (error) {
    console.log(error)
    res.status(500).json({message: "An error occurred"})
   }
}

const login= async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({message: "Email or password is missing"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User with this email not found"})
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(401).json({message: "Wrong password"})
        }

        generateToken(user._id,res)
        return res.status(200).json({message: "User logged in successfully",user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "An error occurred"})
    }
}

const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        return res.status(200).json({message: "User logged out successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "An error occurred"})
    }
}

const update = async(req,res)=>{
    try {
        const {pfp} = req.body
        const userId = req.user._id
        const uploadPfp = cloudinary.uploader.upload(pfp)
        const updatedUser = User.findByIdAndUpdate(userId, {profilePic: uploadPfp.secure_url},{new: true})
        res.status(200).json({message: "Profile picture updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export {signup, login, logout, update, checkAuth}