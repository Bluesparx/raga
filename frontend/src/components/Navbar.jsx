import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/mood">Log Mood</Link></li>
        <li><Link to="/insights">Insights</Link></li>
        <li><Link to="/community">Community</Link></li>
        <li><Link to="/recommendations">Recommendations</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;