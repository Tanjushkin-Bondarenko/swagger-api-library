import mongoose from "mongoose";

export const mongodbConnection = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connection established')
  } catch (error) {
    console.error("MongoDB connection error", error)
    throw error
  }
}