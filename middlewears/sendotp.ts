import express , {Response , Request } from 'express'
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import { userSchema } from '../Model/user';
import redisClient from '../db/redis';
import jwt from 'jsonwebtoken'
const app = express();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service : 'gmail', // Use your email service here, like 'Gmail', 'Outlook', etc.
  auth: {
    user: 'vatsal.purbia@appinventiv.com', // Replace with your email address
    pass: 'ettenjxquydotqjl', // Replace with your email password
  },
});

// Helper function to generate a 6-digit OTP
function generateOTP(): string {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// Route for handling the "forgot password" request and sending OTP over email
export const sendOtp = async (req: Request, res: Response  ) => {
    const token = "" + req.headers.authorization
    let decode: any
    decode =  jwt.verify(token , 'secretKey1')
  console.log(req.body.email)
  const user = await userSchema.findOne({
    where : {email :  req.body?.email}
  })
  JSON.parse(JSON.stringify(user))
  if(!user) {
    res.send(404).json({error : "User not found"})
  }
  // TODO: Here, you should check if the email exists in your user database.
  // If it does, generate a unique token (e.g., using 'uuid' package) and store it with the user record.
  // For simplicity, I'll assume the token is already generated and stored in a 'resetToken' variable.
  else {
    
  // Generate OTP
  const OTP = generateOTP();
    const {email} = req.body
  // Create the email
  const mailOptions: nodemailer.SendMailOptions = {
    from: 'vatsal.purbia@appinventiv.com',
    to: email,
    subject: 'Password Reset Request',
    text: `Hello,\n\nYou have requested a password reset. Your OTP is: ${OTP}\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe YourApp Team`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      redisClient.setEx(`OTP${decode.id}` , 900000 , `${OTP}`)// TODO: Save the OTP and its expiration timestamp in the user's record in the database.
      console.log('herrerrrr----------------------------------------------------')
      return res.status(200).json({ message: 'Email sent successfully' });
    }
  });
}};