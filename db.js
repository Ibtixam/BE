import mongoose from "mongoose";

export const connectToDb = () => {
  mongoose.connect("mongodb://localhost:27017/BE");

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};
