import express from "express";
import nodemailer from "nodemailer";

const verifyOtp = express.Router();

// Email transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

// Send otp;
verifyOtp.post('/send-otp', async (req, res) => {
    try {

        const { email } = req.body;
        const redis = req.app.locals.redis;

        if (!email) {
            return res.status(400).json({ message: "Email is required." })
        }

        // Generate otp;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store otp in Redis with time limit of (5 minutes)
        await redis.setEx(`otp:${email}`, 300, otp);

        // send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your Email",
            text: `Your otp is: ${otp} (It is valid only for 5 minutes). Don't share this with anyone else unknown. And with this enjoy free service.`
        });
        return res.status(200).json({ message: "otp send to email successfully" });

    } catch (err) {
        console.error("Error sending OTP:", err.message, err);
        return res.status(500).json({ message: "Failed to send OTP", error: err.message });
    }
})


// Verifying otp
verifyOtp.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const redis = req.app.locals.redis;

        const storedOtp = await redis.get(`otp:${email}`);
        if (!storedOtp) {
            return res.status(400).json({ message: "OTP either expired or invalid." })
        }
        if (storedOtp !== otp) {
            return res.status(400).json({ message: "Invalid otp" });
        }

        // OTP verified
        await redis.del(`otp:${email}`);
        return res.status(200).json({ message: "Email verified successfully" });
    } catch (err) {
        console.error("Error verifying OTP:", err)
        return res.status(500).json({ message: "verification failed" });
    }
})

export default verifyOtp;