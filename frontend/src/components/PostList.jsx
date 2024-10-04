import React, { useEffect, useState } from 'react';
import { getAllPostsAPI } from '../utils/apiRequest';
import PostItem from './Postitem';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const data = await getAllPostsAPI();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostLiked = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
    )
    );
  };

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} onPostLiked={handlePostLiked} />
      ))}
    </div>
  );
};

export default PostList;
