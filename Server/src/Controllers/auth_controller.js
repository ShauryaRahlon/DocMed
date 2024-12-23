import dotenv from 'dotenv';
import User from '../Models/user.model.js';
import bcrypt from 'bcryptjs'; //Used to encrypt the password in the database
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

// Generating a random OTP
function generateOTP() {
    // Generate number between 100000 and 999999
    return Math.floor(100000 + Math.random() * 900000);
}

export const signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Input validation
        if (!userName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check existing user
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({ error: "User with same email already exists" });
        }

        // Generate OTP
        const otp = generateOTP();

        // Configure email transport
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "hackathonuse@gmail.com",
                pass: "qvtlfpckypighxck",
            },
        });

        // Send OTP email
        try {
            await transporter.sendMail({
                from: "hackathonuse@gmail.com",
                to: email,
                subject: "Your OTP for Signup",
                text: `Your OTP for signup is ${otp}.`,
                html: `
                    <h2>Welcome to !</h2>
                    <p>Your OTP for signup is: <strong>${otp}</strong></p>
                    <p>If you didn't request this OTP, please ignore this email.</p>
                `
            });
        } catch (error) {
            return res.status(500).json({ error: "Failed to send OTP email" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            otp,
            isVerified: false
        });

        console.log(newUser);

        await newUser.save();

        return res.status(201).json({
            message: "User created successfully. Please verify your email with the OTP.",
            userId: newUser._id,
            email: newUser.email,
            otp: newUser.otp
        });

    } catch (error) {
        console.error("Error in signUp controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required" });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if user is already verified
        if (user.isVerified) {
            return res.status(400).json({ error: "User is already verified" });
        }

        // Verify OTP
        if (user.otp !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        // Update user verification status
        user.isVerified = true;
        user.otp = undefined;  // Remove OTP after successful verification
        await user.save();

        return res.status(200).json({ message: "Email verified successfully" });

    } catch (error) {
        console.error("Error in verifyOTP controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check credentials

    const checkUser = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, checkUser?.password || ""); //Adding a null string so that on adding wrong password no error gets thrown

    if (checkUser && isPasswordCorrect) {
        const token = jwt.sign({ _id: checkUser._id }, process.env.MY_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ message: 'Login successful!', token });
    } else {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }
};
      
