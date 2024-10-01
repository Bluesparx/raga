import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Mood rating is required"],
      min: 1,
      max: 10
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    date: {
      type: Date,
      required: [true, "Date is required"]
    },
    // tags: {
    //   type: [String],
    //   default: []
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;