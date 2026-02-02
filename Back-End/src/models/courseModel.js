import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: String,
    discription: String,
    price: Number,
    duration: String,
    thumbnail: String,
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true },
);


export default mongoose.model("Course", courseSchema)
