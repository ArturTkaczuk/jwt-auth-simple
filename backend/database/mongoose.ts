import mongoose from "mongoose";

export const connectDB = async () => {
  const connectionString = process.env.MONGO_URI as string;
  try {
    await mongoose.connect(connectionString);
    console.log(`[database]: Success connecting to the MongoDB database`);
  } catch (error) {
    console.log("Error connecting to the Database");
    console.error(error);
  }
};
