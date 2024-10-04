import React, { useState } from "react";
import { createPostAPI } from "../utils/apiRequest";
import Swal from "sweetalert2"; 

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({title, content, tags})
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);

    try {
      const response = await createPostAPI({ title, content, tags: tagsArray });

      // Show success alert
      Swal.fire({
        title: "Post Created!",
        text: "Your post has been created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear the form fields
      setTitle("");
      setContent("");
      setTags(""); 
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue creating the post. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={handleTagsChange}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Create Post
      </button>
    </form>
  );
};

export default PostForm;
