import React, { useState } from "react";
import { Vortex } from "../ui/vortex";
import { Navbar2 } from "../Navbar2";
import "../shimmer.css"; // For shimmer animation

const JokeGenerator = () => {
  const [joke, setJoke] = useState("");

  // Function to fetch a random joke from the API
  const fetchJoke = () => {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => response.json())
      .then((data) => {
        setJoke(`${data.setup} - ${data.punchline}`);
      })
      .catch((error) => {
        setJoke("Oops! Couldn't fetch a joke. Try again.");
      });
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Vortex>
        {/* <Navbar2 /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "7rem",
            paddingBottom: "4rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "60%",
              padding: "40px",
              backgroundColor: "black",
              borderRadius: "12px",
              boxShadow: "0 1px 10px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                marginBottom: "15px",
                fontSize: "25px",
                color: "#e0e0e0",
              }}
            >
              Jokes Generator
            </h1>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h1 style={{ color: "#fff", marginBottom: "10px" }}>
                Need a Laugh?
              </h1>

              {/* Button with shimmer effect */}
              <button
                className="relative inline-block px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg overflow-hidden"
                onClick={fetchJoke}
                style={{
                  position: "relative",
                  display: "inline-block",
                  padding: "12px 24px",
                  fontSize: "16px",
                  backgroundColor: "#6B46C1",
                  borderRadius: "8px",
                  cursor: "pointer",
                  overflow: "hidden",
                  border: "none",
                  color: "#fff",
                }}
              >
                <span
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-150%",
                    width: "200%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
                    animation: "shimmer 2s infinite",
                  }}
                ></span>
                Get a Random Joke
              </button>

              {/* Joke display */}
              <div>
                {joke && (
                  <p
                    style={{
                      fontSize: "20px",
                      maxWidth: "600px",
                      margin: "20px auto",
                      padding: "10px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
                    }}
                  >
                    {joke}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default JokeGenerator;
