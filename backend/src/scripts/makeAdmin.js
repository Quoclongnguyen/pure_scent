import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import connectDB from "../config/db.js";

dotenv.config();

const makeAdmin = async () => {
  try {
    await connectDB();
    const adminEmail = "admin@purescent.com";
    
    // Find the user and make them an admin
    const user = await User.findOneAndUpdate(
      { email: adminEmail },
      { isAdmin: true },
      { new: true }
    );

    if (user) {
      console.log(`Successfully upgraded user ${user.email} to Admin!`);
    } else {
      console.log(`User with email ${adminEmail} not found. Please register first.`);
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

makeAdmin();
