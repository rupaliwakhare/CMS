import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protect = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(!token) return res.status(401).send("Token not provided");

        const decode = jwt.verify(token, process.env.SECRET_KEY);
       req.user = {
         id: decode.id,
         role: decode.role,
       };
        next()
    } catch (error) {
        res.status(401).send("Invalid token")
    }
}