import mongoose from "mongoose";

const reviewScheme = new mongoose.Schema(
    {
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
        ,
        rating:{
            type:Number,
            min:1,
            max:5
        },
        review:String
    },{timestamps:true}
);

export default mongoose.model("Review", reviewScheme);