import mongoose from 'mongoose';

// Create a userSchema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: true },
    age: { type: String, required: true },

    // Otp verification
    otp: {type: String, require: true, unique: true},

    // Schema for link saving
    handle: { type: String, unique: true, sparse: true },
    picture: { type: String },
    description: { type: String },

    links: [{
        title: { type: String, required: true },
        url: { type: String, required: true }
    }]

})

export default mongoose.model("User", userSchema);
