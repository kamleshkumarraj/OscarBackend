import User from '../models/userModel.js';
import Otp from '../models/Otp.js';
import bcrypt from 'bcryptjs';
// import crypto from 'crypto';
import { sendOtpEmail } from '../services/emailService.js';
import EmailVerifyUser from '../models/EmailVerify.js';
import { v4 as uuidv4 } from 'uuid';


import express from 'express';

import nodemailer from 'nodemailer';

const router = express.Router();

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const newOtp = new Otp({ userId: user._id, otp });
        await newOtp.save();

        await sendOtpEmail(email, `Your password reset OTP is: ${otp}`);

        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const verifyOtpAndResetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const userOtp = await Otp.findOne({ userId: user._id, otp });
        if (!userOtp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        await Otp.deleteOne({ _id: userOtp._id });

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const resetPasswordVerify = async(req,res) => {
    const { token, newPassword } = req.body;

    try {
      const emailVerifyUser = await EmailVerifyUser.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!emailVerifyUser) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      const user = await User.findOne({ email: emailVerifyUser.email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      user.password = newPassword; // Will trigger the bcrypt hash in the pre-save hook
      await user.save();
  
      // Optionally, you can delete the token record after successful reset
      await EmailVerifyUser.deleteOne({ email: emailVerifyUser.email });
  
      res.status(200).json({ message: 'Password successfully reset' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
}



// Route to request password reset
export const requestPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
       
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate a reset token and expiration time
        const token = uuidv4();
        user.resetPasswordToken = token;
        // user.resetPasswordExpires = Date.now() + 3600000; 
        let expirationTime  = Date.now() + 3600000; 

        const emailVerifyUser = new EmailVerifyUser({
            email,
            password : user.password,
            resetPasswordToken: token,
            resetPasswordExpires: expirationTime,
          });
          
          const emailVerifyUserDataCheck= await EmailVerifyUser.findOne({
            email: email,
            resetPasswordExpires: { $gt: Date.now() },
          });

          if(emailVerifyUserDataCheck){
          return  res.status(200).json({"data" : "reset link already sent to your email please check your mail"})
          }
          

          await EmailVerifyUser.findOneAndUpdate(
            { email },
            { resetPasswordToken: token, resetPasswordExpires: expirationTime },
            { upsert: true }
        );

       
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'er.akhtarshoaib@gmail.com', 
                pass: 'qcgvrxndygbvzzhi',  
            },
        });

        const resetLink = `http://localhost:5173/create-new-password?token=${token}`;

        const mailOptions = {
            to: user.email,
            from: 'er.akhtarshoaib@gmail.com',
            subject: 'Password Reset Request',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${resetLink}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(200).json({ message: 'Password reset email sent' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export default router;

