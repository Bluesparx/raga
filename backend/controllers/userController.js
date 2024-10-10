import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const registerControllers = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter All Fields"
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: newUser
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const loginControllers = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password"
      });
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}`,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const allUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "_id"
    ]);

    return res.json(users);
  } catch (err) {
    next(err);
  }
};

// reset password //
export const resetPasswordControllers = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(3).toString("hex");

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.APP_PASSWORD
      }
    });

    let mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${resetToken}`
    };
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send email", error });
      }

      user.resetToken = resetToken;
      user.tokenExpires = Date.now() + 3600000;
      await user.save();

      res.status(200).json({ message: "Reset code sent to your email." });
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to reset password", error });
  }
};

// confirm password //
export const passwordConfirmControllers = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    const user = await User.findOne({
      email,
      resetToken,
      tokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.tokenExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been successfully updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reset password", error });
  }
};
