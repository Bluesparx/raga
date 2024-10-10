import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import MoodLogger from "./components/Pages/MoodLogger";
import SleepTracker from "./components/Pages/SleepTracker";
import LoginForm from "./components/Pages/Login.jsx";
import SignupForm from "./components/Pages/Signup.jsx";
import { useAuth } from "./utils/authProvider.jsx";
import JokeGenerator from "./components/Pages/JokeGenerator.jsx";
import MoodCalendarPage from "./components/Pages/MoodCalendarPage.jsx";
import Dashboard from "./components/Pages/Dashboard.jsx";
import MoodGraphPage from "./components/Pages/MoodGraphPage.jsx";
import SleepGraphPage from "./components/Pages/SleepGraphPage.jsx";
import ContactUsPage from "./components/Pages/ContactUsPage.jsx";
import AboutUsPage from "./components/Pages/AboutUsPage.jsx";
import { AuthProvider } from "./utils/authProvider.jsx";

import NavbarSwitch from "./utils/navbarSwitch.jsx";
import ForgotPassword from "./components/Pages/ForgotPassword.jsx";

function App() {
  const token = useAuth();
  return (
    <AuthProvider>
      <Router>
        <div className="App bg-black">
          <NavbarSwitch />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignupForm/>} />
            {/* <Route path="/" element={<HomeLoggedOut />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/mood" element={<MoodLogger />} />
            <Route path="/sleep" element={<SleepTracker />} />
            <Route path="/joke" element={<JokeGenerator />} />
            <Route path="/calendar" element={<MoodCalendarPage />} />
            <Route path="/mgraph" element={<MoodGraphPage />} />
            <Route path="/sgraph" element={<SleepGraphPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            {/* <Route path="/aboutus" element={<AboutUsLogOut />} /> */}
            <Route path="/blogs" element={<Dashboard />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
