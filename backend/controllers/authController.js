import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
let registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    // validation check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // check if email already exists 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create the User
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};


let loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await user.comparePassword(password,user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error logging in user", error: err.message });
    }
};

let getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password -__v");
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(user);
    }catch(err){
         res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

export { generateToken, registerUser, loginUser, getUserInfo };
