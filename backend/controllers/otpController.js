import nodemailer from 'nodemailer';
import User from '../models/UserModel.js';

export const otpController=async(req,res)=>{ 

// Function to generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "localhost",
  port: 25,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass : process.env.SENDER_PASSWORD
  },
});
  const { email } = req.body;
  const otp = generateOTP();

  const mailOptions = {

    from: process.env.SENDER_EMAIL,
    to: email, 
    subject: 'Your OTP for verification',
    text: `Your OTP is: ${otp}`
  };

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Set OTP and expiration
    user.otp = otp;
    user.otpExpiration = new Date(Date.now() + 5 * 60 * 1000); 
    await user.save();
    // console.log(user.otp);
    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent successfully' });
  }  catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
}

