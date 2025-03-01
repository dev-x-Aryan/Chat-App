import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyRoute = async (req, res, next) => {
    // console.log("Middleware triggered!"); 
    try {
        // console.log("Cookies Received:", req.cookies);  // Debugging

        const token = req.cookies?.jwt;  // Ensure cookies exist
        if (!token) {
            console.log("No token found");
            return res.status(401).json({ message: "You are not logged in" });
        }

        // Verify JWT Token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(" Decoded Token:", decoded);

        // Find User
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            console.log(" User not found in database");
            return res.status(404).json({ message: "User not found!" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in verifyRoute:", error.message);

        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Token expired, please log in again" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
