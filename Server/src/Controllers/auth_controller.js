import dotenv from 'dotenv';
import User from '../Models/user.model.js';

// Load environment variables
dotenv.config();
export const signUp = async(req,res) => {
    try {
        const {userName, phoneNumber} = req.body;

        if (!userName || !phoneNumber){
            return res.status(400).json({error:"Both username and password are required"});
        }

        const phone = await User.findOne({phoneNumber});
        if (phoneNumber.length > 10){
            return res.status(400).json({error:"Phone number should be 10 digits long"})
        }
        if (phone) {
            return res.status(400).json({error:"User with same phone number already exists"})
        }

        const newUser = new User ({
            userName,
            phoneNumber,
        })

        if (newUser) {
            await newUser.save();
            return res.status(201).json({
                _id:newUser._id,
                userName:newUser.userName,
                phoneNumber:newUser.phoneNumber,
            })
        }
        else {
            res.status(400).json({error:"Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signUp controller",error.message);
        res.status(500).json({error:"Internal server error"})
    }
};

export const login = (req, res) => {
    const { userName, phoneNumber } = req.body;

    // Validate email and password
    if (!userName || !phoneNumber) {
        return res.status(400).json({ message: 'Username and Phone Number are required.' });
    }

    // Check credentials
    if (userName === process.env.USER_NAME && phoneNumber === process.env.PHONE_NUMBER) {
        //Send OTP on whatsapp using whatsapp-web.js and verify it
        return res.status(200).json({ message: 'Login successful!' });
    } else {
        return res.status(401).json({ message: 'Invalid username or phone number.' });
    }
};
