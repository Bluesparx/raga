import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebaseConfig.js';
import GoogleButton from 'react-google-button'

const GoogleAuthButton = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info: ", user);
      
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
