import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("Missing MONGO_URI in environment variables");
}

let isConnected: boolean = false; // track the connection status

const connectDB = async (): Promise<void> => {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        const connection = await mongoose.connect(MONGO_URI);

        isConnected = connection.connections[0].readyState === 1;
        if (isConnected) {
            console.log("MongoDB connected");
        } else {
            console.log("Failed to connect to MongoDB");
        }
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};

export default connectDB;
