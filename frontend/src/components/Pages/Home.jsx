import React from "react";
import { WavyBackgroundDemo } from "../WavyBackgroundDemo";
import { Navbar2 } from "../Navbar2";
import { NavbarDemo } from "../NavbarDemo";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };
  return (
    <div>
      {/* <Navbar2/> */}
      <WavyBackgroundDemo />

      <div className="mt-8 w-full flex justify-center">
        <button
          className=" absolute px-6 py-3 bg-transparent border-2
          top-[75%] 
          w-[200px]
          h-[60px]
          border-pink-400 text-pink-500 rounded-full
          hover:bg-pink-500
          hover:text-black
          hover:border-black"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
