// src/AddPost.jsx
import React from 'react';
import PostForm from './PostForm';

const AddPost = () => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold">Create a New Post</h2>
      <PostForm/>
    </div>
  );
};

export default AddPost;
