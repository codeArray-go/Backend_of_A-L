import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const signupRoute = express.Router();

signupRoute.post('/', async (req, res) => {
    try {
        const { username, email, password, phone, age } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User is already existing' });

        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        const user = new User({ email, username, password: hashedPassword, phone, age });
        await user.save();

        res.status(200).json({ message: 'User is created Succesfylly' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default signupRoute;
