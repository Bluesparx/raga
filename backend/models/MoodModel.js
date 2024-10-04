import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    calmness: {
      type: Number,
      required: [true, "Calmness rating is required"],
      min: 0,
      max: 100,
    },
    energy: {
      type: Number,
      required: [true, "Energy rating is required"],
      min: 0,
      max: 100,
    },
    focus: {
      type: Number,
      required: [true, "Focus rating is required"],
      min: 0,
      max: 100,
    },
    happiness: {
      type: Number,
      required: [true, "Happiness rating is required"],
      min: 0,
      max: 100,
    },
    stress: {
      type: Number,
      required: [true, "Stress rating is required"],
      min: 0,
      max: 100,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    date: {
      type: Date,
      default: Date.now, 
      required: [true, "Date is required"],
    },
    tags: {
      type: [String],
      default: [], 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } 
);

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;
