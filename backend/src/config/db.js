import mongoose from 'mongoose';

export const isDbConnected = { value: false };

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 4000
    });

    isDbConnected.value = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    isDbConnected.value = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB Atlas (${error.message}).`);
    console.warn('[MongoDB Fallback] Running in resilient memory fallback mode for local testing.');
  }
};