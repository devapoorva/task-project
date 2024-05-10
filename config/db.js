import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
    }
};