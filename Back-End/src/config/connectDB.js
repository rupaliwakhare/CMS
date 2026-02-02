import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,{
  dbName: "cms_project"  
});
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
