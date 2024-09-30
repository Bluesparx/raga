import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Your Mental Health Tracker</h1>
      <div>
        <h2>Quick Actions</h2>
        <Link to="/mood">
          <button>Log Your Mood</button>
        </Link>
        <Link to="/insights">
          <button>View Insights</button>
        </Link>
      </div>
      <div>
        <h2>Today's Overview</h2>
        {/* Placeholder for today's mood summary */}
        <p>Your mood today: [Placeholder]</p>
      </div>
      <div>
        <h2>Recent Community Posts</h2>
        {/* Placeholder for recent community posts */}
        <ul>
          <li>Post 1 placeholder</li>
          <li>Post 2 placeholder</li>
          <li>Post 3 placeholder</li>
        </ul>
        <Link to="/community">See more posts</Link>
      </div>
      <div>
        <h2>Daily Tip</h2>
        {/* Placeholder for daily mental health tip */}
        <p>Remember to take deep breaths throughout your day to help manage stress.</p>
      </div>
    </div>
  );
}

export default Home;