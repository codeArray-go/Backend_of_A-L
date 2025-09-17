import express from "express";
import { requireAuth } from "../middleware/auth.js";
import User from "../models/User.js";

const getDataRouter = express.Router();

getDataRouter.get("/me", requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("username");
        if (!user) return res.status(404).json({ message: "User not find" });

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

getDataRouter.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username: username }).select("handle picture description links");
        if (!user) return res.status(404).json({ message: "Data not found" });
        res.status(200).json({ user });
    } catch (err) {
        console.log('Error while fetching data:', err);
        res.status(500).json({ message: "Server is finding issue while fetching your profile." });
    }
})

export default getDataRouter;