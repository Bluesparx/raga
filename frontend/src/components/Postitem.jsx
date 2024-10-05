import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { toggleLikePostAPI } from '../utils/apiRequest';

const PostItem = ({ post, onPostLiked }) => {
  const handleLike = async () => {
    try {
      const response = await toggleLikePostAPI(post._id);
      onPostLiked(response);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/80 rounded-lg shadow-md overflow-hidden mb-6 hover:shadow-lg transition-shadow duration-300">
      {/* Post Title */}
      <div className="px-3 py-4">
        <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
        <p className="mt-2 text-gray-600">{post.content}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm font-medium bg-blue-100 text-blue-800 rounded-full px-3 py-1 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Like Button and Like Count */}
      <div className="px-6 py-4 bg-white/30 flex items-center justify-between">
        <button
          onClick={handleLike}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
          Like
        </button>
        <p className="text-gray-700 font-medium">{post.likes.length} Likes</p>
      </div>
    </div>
  );
};

export default PostItem;
