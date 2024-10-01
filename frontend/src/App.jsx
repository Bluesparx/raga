import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WavyBackgroundDemo } from './components/WavyBackgroundDemo';
import Home from './pages/Home';
import MoodLogger from './pages/Mood';
import Insights from './pages/Insights';
import Community from './pages/Community';
import Recommendations from './pages/Recommendations';
import { NavbarDemo } from './components/NavbarDemo';

function App() {
  return (
    <Router>
      <div className="App">
    <NavbarDemo/>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mood" element={<MoodLogger />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/community" element={<Community />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes> */}
     <WavyBackgroundDemo/>
   
    </div>
    </Router>
  );
}

export default App;
