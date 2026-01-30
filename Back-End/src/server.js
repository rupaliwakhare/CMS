import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();
const app = express()

app.use(express.json());

const PORT = process.env.PORT || 4045;

connectDB();

app.get("/",(req,res)=>{
    res.send("welcome to our server")
})

app.use("/api/user",authRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})