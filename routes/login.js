import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const loginRoute = express.Router();

loginRoute.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password.trim(), user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Sending token to cookies rather then in localstorage
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax', 
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        })

        res.json({ token, user: {_id:user._id, username: user.username, email: user.email}});

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default loginRoute;
