import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";


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