import React, { useState } from "react";
import { Vortex } from "../ui/vortex";
import { Navbar2 } from "../Navbar2";
import AddPost from "../AddPost"; 
import PostList from "../PostList";

export default function Dashboard() {
  const [showAddPost, setShowAddPost] = useState(false); 

  const handleAddPostClick = () => {
    setShowAddPost(true);
  };

  const handleBackToPostsClick = () => {
    setShowAddPost(false); 
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Vortex>
        {/* <Navbar2 /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "7rem",
            paddingBottom: "4rem",
          }}
        >
          
            {showAddPost ? (
              <div>
                <button
                  type="button"
                  className="text-gray-100 bg-violet-800 border border-gray-900 focus:outline-none hover:bg-violet-700 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mb-4"
                  onClick={handleBackToPostsClick}
                >
                  Back to Posts
                </button>
                <AddPost />
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  className="text-gray-100 bg-violet-800 border border-gray-900 focus:outline-none hover:bg-violet-700 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mb-4"
                  onClick={handleAddPostClick}
                >
                  Add New Post
                </button>
                <PostList />
              </div>
            )}
         
        </div>
      </Vortex>
    </div>
  );
}
