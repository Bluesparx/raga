import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './Firebase.js';
import GoogleButton from 'react-google-button'
import { useAuth } from '../../utils/authProvider.jsx';
import { useNavigate } from 'react-router-dom';

const GoogleAuthButton = () => {

  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // console.log("User Info: ", user);
      const token = user.accessToken;
      login(token);
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
      
    }
  };
  

  return (
    <div>
      <GoogleButton onClick={handleGoogleSignIn}/>
    </div>
  );
};

export default GoogleAuthButton;
