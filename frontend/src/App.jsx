import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WavyBackgroundDemo } from './components/WavyBackgroundDemo';
import Home from './components/Pages/Home';
import MoodLogger from './components/Pages/MoodLogger';
import { Navbar2 } from './components/Navbar2';
import SleepTracker from './components/Pages/SleepTracker';
import { SignupFormDemo } from './components/SignupDemoForm';
import MemeGenerator from './components/JokeGenerator';
import JokeGenerator from './components/JokeGenerator';

function App() {
  return (
    <Router>
      <div className="App">
   
        <Routes>
        <Route path="/" element={<MemeGenerator />} />
        <Route path="/home" element={<Home />} />
          <Route path='/mood' element={<MoodLogger/>}/> 
          <Route path='/sleep' element={<SleepTracker/>}/>
          <Route path='/joke' element={<JokeGenerator/>}/> 
        </Routes>
   
   
    </div>
    </Router>
  );
}

export default App;
