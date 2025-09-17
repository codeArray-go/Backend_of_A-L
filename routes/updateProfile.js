import express from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const updateProf = express.Router();

updateProf.post("/", requireAuth, async (req, res) => {
    try {
        const { handle, picture, description, links } = req.body;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (handle) {
            const existingHandle = await User.findOne({ handle });
            if (existingHandle && existingHandle._id.toString() !== req.userId) {
                return res.status(400).json({ success: false, message: "Handle is already taken" });
            }

            user.handle = handle;
        }

        user.picture = picture;
        user.description = description;
        user.links = links;

        await user.save();
        res.status(200).json({ success: true, message: "Link saved Successfully" });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: "This handle is already in use" });
        }
        res.status(500).json({ success: false, message: "Server error while updating profile" });
    }
})

export default updateProf;
