import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WavyBackgroundDemo } from "./components/WavyBackgroundDemo";
import Home from "./components/Pages/Home";
import MoodLogger from "./components/Pages/MoodLogger";
import { Navbar2 } from "./components/Navbar2";
import { NavbarDemo } from "./components/NavbarDemo"; // Your demo navbar component
import SleepTracker from "./components/Pages/SleepTracker";
import { LoginForm } from "./components/Login";
import { SignupFormDemo } from "./components/SignupDemoForm";
import { useAuth } from "./utils/authProvider.jsx"; // Import the useAuth hook
import MemeGenerator from "./components/Pages/JokeGenerator.jsx"; // Consider renaming if both components are distinct
import JokeGenerator from "./components/Pages/JokeGenerator.jsx";
import MoodCalendar from "./components/MoodCalendar.jsx";
import MoodCalendarPage from "./components/Pages/MoodCalendarPage.jsx";
import Dashboard from "./components/Pages/Dashboard.jsx";
import MoodDemo from './components/Pages/MoodDemo.jsx';
import MoodGraphPage from "./components/Pages/MoodGraphPage.jsx";
import SleepGraphPage from "./components/Pages/SleepGraphPage.jsx";
import ContactUsPage from "./components/Pages/ContactUsPage.jsx";
import AboutUsPage from "./components/Pages/AboutUsPage.jsx";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupFormDemo />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mood" element={<MoodLogger />} />
          <Route path="/sleep" element={<SleepTracker />} />
          <Route path="/joke" element={<JokeGenerator />} />
          <Route path="/calendar" element={<MoodCalendarPage />} />
          <Route path="/mgraph" element={<MoodGraphPage />} />
          <Route path="/sgraph" element={<SleepGraphPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/blogs" element={<Dashboard/>}/>
          <Route path="/about" element={<AboutUsPage/>}/>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
