import express from "express";

const LogoutRouter = express.Router();

LogoutRouter.post("/", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "Logged out successfully" });
});

export default LogoutRouter;
