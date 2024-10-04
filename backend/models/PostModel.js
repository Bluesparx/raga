import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      minlength: [5, "Post title must be at least 5 characters long"],
      maxlength: [50, "Post title cannot exceed 50 characters"]
    },
    content: {
      type: String,
      required: [true, "content is required"]
    },
    date: {
      type: Date,
      default: Date.now
    },
    tags: { 
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 4; 
        },
        message: "Tags must contain between 1 and 4 items."
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    }]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post