import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import "dotenv/config";


export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All the fields are required"
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must at least 6 characters'
      });
    }

    /* Email validation */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }


    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message: "Email already exists"
      })
    }

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //User creation
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    })

    if (newUser) {
      // save user first
      const savedUser = await newUser.save();

      // function for authenticating user
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      });

      // Send welcome email (non-blocking)
      sendWelcomeEmail(
        savedUser.email,
        savedUser.fullName,
        process.env.CLIENT_URL
      ).catch(error => {
        console.error("Failed to send welcome email:", error);
      });


    } else {
      res.status(400).json({
        message: "Invalid user data"
      })
    }

  } catch (error) {
    console.log("Error in signup controller: ", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
}