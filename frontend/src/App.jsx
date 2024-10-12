import { useLocation, useRoutes } from "react-router-dom";
import Home from "./components/Pages/Home";
import MoodLogger from "./components/Pages/MoodLogger";
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
import ForgotPassword from "./components/Pages/ForgotPassword.jsx";
import PageNotFound from "./components/Pages/PageNotFound.jsx";
import NavbarSwitch from "./utils/navbarSwitch.jsx";
import SleepTracker from "./components/Pages/SleepTracker.jsx";
import { AuthProvider } from "./utils/authProvider.jsx";
import BreathingGame from "./components/Pages/Breathing.jsx";

const routeDefinitions = [
  { path: "/" , element: <Home /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <SignupForm /> },
  { path: "/mood", element: <MoodLogger /> },
  { path: "/sleep", element: <SleepTracker /> },
  { path: "/joke", element: <JokeGenerator /> },
  { path: "/calendar", element: <MoodCalendarPage /> },
  { path: "/mgraph", element: <MoodGraphPage /> },
  { path: "/sgraph", element: <SleepGraphPage /> },
  { path: "/contact", element: <ContactUsPage /> },
  { path: "/blogs", element: <Dashboard /> },
  { path: "/about", element: <AboutUsPage /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path:"/breathing-game", element: <BreathingGame />},
  { path: "*", element: <PageNotFound /> },
];
   
function App() {
  const token = useAuth();
  const location = useLocation();
  const routing = useRoutes(routeDefinitions);

  // Check if the current path is defined in the routeDefinitions
  const isDefinedRoute = routeDefinitions.some(
    (route) => route.path === location.pathname
  );

  return (
    <AuthProvider>
      <div className="App bg-black">
        {isDefinedRoute && <NavbarSwitch />} {routing}
      </div>
    </AuthProvider>
  );
}

export default App;
