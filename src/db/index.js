import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log("Mongodb connected", process.env.MONGO_URI);
    // console.log(connectionInstance);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
