import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import enrollementRoutes from "./routes/enrollmentRoutes.js"

dotenv.config();
const app = express()

app.use(express.json());

const PORT = process.env.PORT || 4045;

connectDB();

app.get("/",(req,res)=>{
    res.send("welcome to our server")
})

app.use("/api/user",authRoutes)
app.use("/api/course",courseRoutes)
app.use("/api/enroll",enrollementRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})