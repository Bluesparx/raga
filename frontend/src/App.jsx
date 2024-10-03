import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WavyBackgroundDemo } from './components/WavyBackgroundDemo';
import Home from './components/Pages/Home';
import MoodLogger from './components/Pages/MoodLogger';
import { Navbar2 } from './components/Navbar2';
import {NavbarDemo} from './components/NavbarDemo'; // Your demo navbar component
import SleepTracker from './components/Pages/SleepTracker';
import { LoginForm } from './components/Login';
import { SignupFormDemo } from './components/SignupDemoForm';
import { useAuth } from './utils/authProvider.jsx'; // Import the useAuth hook

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<SignupFormDemo />} />
          <Route path="/" element={<Home />} />
          <Route path='/mood' element={<MoodLogger />} /> 
          <Route path='/sleep' element={<SleepTracker />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
