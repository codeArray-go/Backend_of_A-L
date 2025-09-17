import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        console.log("DataBase is already connected.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("MongoDB is connected now successfully");

    } catch (error) {
        console.error("Database se connect krne me error: ", error);
        throw error;
    }
};
