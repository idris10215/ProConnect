import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";


export const register = async (req, res) => {

    try {

        const {name, email, password, username} = req.body;

        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedpassword,
            username
        });

        await newUser.save();

        const profile = new Profile({userId: newUser._id});

        res.status(201).json({ message: "User registered successfully" });


        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

}


export const login = async (req, res) => {
    try {

        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message:"username and password are required"});
        }
        
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = crypto.randomBytes(32).toString('hex'); 

        await user.updateOne({_id: user._id}, {token});
        res.status(200).json({message: "Login successful", token, userId: user._id});

    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateProfilePicture = async (req, res) => {
    try {

        const {token } = req.body;

        const user = await User.findOne({token});
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }

        user.profilePicture = req.file.filename;

    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        
    }
}