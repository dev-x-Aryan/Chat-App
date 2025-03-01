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
        console.log(existingUser)
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

// const update = async(req,res)=>{
//     try {
//         console.log("Headers:", req.headers);
//         console.log("Request Body:", req.body);

//         if (!req.body || !req.body.pfp) {
//             return res.status(400).json({ message: "No profile picture received" });
//         }
//         const {pfp} = req.body
//         const userId = req.user._id
//         const uploadPfp = await cloudinary.uploader.upload(pfp)
//         const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadPfp.secure_url},{new: true})
//         res.status(200).json({message: "Profile picture updated"})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message: "Internal server error"})
//     }
// }

const getProfile = async (req, res) => {
    try {
        // console.log("Middleware triggered ");
        // console.log("Request Method:", req.method);
        console.log("Request Body:", req.body);

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        if (req.method === "GET") {
            // Fetch user profile
            const user = await User.findById(req.user._id).select("-password");
            if (!user) return res.status(404).json({ message: "User not found" });

            return res.status(200).json(user);
        }

        if (req.method === "PUT") {
            // Update profile picture
            if (!req.body.profilePicture) {
                return res.status(400).json({ message: "No profile picture received" });
            }

            const uploadPfp = await cloudinary.uploader.upload(req.body.profilePicture, {
                folder: "profile_pictures",
            });

            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                { profilePic: uploadPfp.secure_url },
                { new: true }
            );

            return res.status(200).json({ message: "Profile picture updated", profilePic: uploadPfp.secure_url });
        }

        return res.status(405).json({ message: "Method Not Allowed" });
    } catch (error) {
        console.error("Error in profile handler:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export {signup, login, logout, checkAuth, getProfile}