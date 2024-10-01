import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    moods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mood"
      }
    ],
    sleeps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sleep"
      }
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
