import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import enrollementRoutes from "./routes/enrollmentRoutes.js"
import errorHandler from "./middleware/errorHandller.js";

dotenv.config();
const app = express()

app.use(express.json());

const PORT = process.env.PORT || 4045;

connectDB();

app.get("/",(req,res)=>{
    res.send("welcome to our server")
})

app.use("/api/auth",authRoutes)
app.use("/api/courses",courseRoutes)
app.use("/api/enroll",enrollementRoutes);

app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})