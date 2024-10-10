import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

const AuthenticatedRoute = ({ element }) => {
  const { token } = useAuth();

  if (token) {
    return element; // If token exists, render the requested component
  } else {
    return <Navigate to="/login" />; // If no token, redirect to login page
  }
};

export default AuthenticatedRoute;
