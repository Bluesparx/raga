import mongoose from "mongoose";

const sleepSchema = new mongoose.Schema(
  {
    duration: {
      type: Number, 
      required: [true, "Sleep duration is required"],
      min: 0,
      max: 24
    },
    quality: {
      type: Number, 
      required: [true, "Sleep quality rating is required"],
      min: 0,
      max: 100
    },
    date: {
      type: Date,
      required: [true, "Sleep date is required"]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Sleep = mongoose.model("Sleep", sleepSchema);

export default Sleep;
