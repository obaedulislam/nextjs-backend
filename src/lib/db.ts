import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async () => {
	try {
		if (mongoose.connection.readyState === 1) {
			console.log("MongoDB already connected");
			return;
		}

		await mongoose.connect(MONGODB_URI, {
			dbName: "next-backend",
		});

		console.log("MongoDB connected to:", mongoose.connection.name);
	} catch (err) {
		console.error("MongoDB connection error", err);
	}
};
