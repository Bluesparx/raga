import jwt from 'jsonwebtoken';
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const registerControllers = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const loginControllers = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password",
            });
        }
        console.log(process.env.JWT_SECRET)
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            token, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const allUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "name",
            "_id",
        ]);

        return res.json(users);
    } catch (err) {
        next(err);
    }
};
