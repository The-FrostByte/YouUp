import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";


export const protectedRoute = async (req, res, next)=>{
  try {
    const token = req.cookies.jwt // can be used only because of cookie-parser
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized  - No token provided"
      })
    }


    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token"
      })
    }

    const user = await User.findById(decoded.userId).select("-password")
    if(!user){
      return res.status(404).json({
        message:"user not found"
      })
    }
    req.user = user; //adding user property in req object
    next();

  } catch (error) {   
    console.log("Error in protectedRoute middleware: ",error);
    res.status(500).json({
      message:"Internal server error"
    });
  }
}

