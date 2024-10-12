import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './Firebase.js';
import { useAuth } from '../../utils/authProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const GoogleAuthButton = ({ text }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = user.accessToken;
      login(token);
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };
  
  return (
    <button 
      className="flex gap-2 items-center justify-center rounded-lg border-violet-400 border w-full py-3"
      onClick={handleGoogleSignIn}
    >
      <FontAwesomeIcon icon={faGoogle} className="h-4 w-4 text-white" />
      <p className="text-sm text-white">{text}</p>
    </button>
  );
};

export default GoogleAuthButton;
