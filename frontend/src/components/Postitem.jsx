import React from 'react';
import { toggleLikePostAPI } from '../utils/apiRequest';

const PostItem = ({ post, onPostLiked }) => {
    console.log(post._id)
  const handleLike = async () => {
    try {
      const response = await toggleLikePostAPI(post._id); 
      onPostLiked(response); 
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="border-sm bg-violet-400 bg-opacity-70 p-4 mb-4 rounded">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="mt-2">{post.content}</p>
      {post.tags.length > 0 && (
        <div className="mt-2">
          <strong>Tags: </strong>
          {post.tags.join(", ")}
        </div>
      )}
      <button onClick={handleLike} className="bg-blue-500 text-white p-2 mt-2">
        Like
      </button>
      <p className="mt-2">{post.likes.length} Likes</p>
    </div>
  );
};

export default PostItem;
