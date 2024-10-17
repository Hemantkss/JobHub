import mongoose from "mongoose";
import express from "express";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connection established");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;