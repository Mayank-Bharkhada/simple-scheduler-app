import mongoose from "mongoose";

const connect = async (uri: string) => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

const db = {
    connect,
};

export default db;
