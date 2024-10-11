import React, { useState, useEffect } from "react";
import DiscreteSliderMarks from "../DiscreteSliderMarks";
import { Navbar2 } from "../Navbar2";
import { Vortex } from "../ui/vortex";
import Swal from "sweetalert2";
import { addMoodEntryAPI, getUserMoodAPI } from "../../utils/apiRequest";

const MoodLogger = () => {
  const [mood, setMood] = useState({
    stress: 50,
    happiness: 50,
    energy: 50,
    focus: 50,
    calmness: 50,
    description: "",
    date: "",
  });

  const [quote, setQuote] = useState("");
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const moodData = await getUserMoodAPI();
        if (moodData.length > 0) {
          setMood(moodData[moodData.length - 1]); // Set the most recent mood
        }
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };
    fetchMoodData();
  }, []);

  const handleChange = (field, value) => {
    setMood((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getHighestMood = () => {
    const moodScores = {
      stress: mood.stress,
      happiness: mood.happiness,
      energy: mood.energy,
      focus: mood.focus,
      calmness: mood.calmness,
    };
    const highestMood = Object.keys(moodScores).reduce((a, b) =>
      moodScores[a] > moodScores[b] ? a : b
    );

    return highestMood;
  };

  const getMoodQuote = (moodType) => {
    const quotes = {
      stress: "Take a deep breath. It’s just a bad day, not a bad life.",
      happiness: "Happiness is not by chance, but by choice.",
      energy: "Energy and persistence conquer all things.",
      focus: "Focus on the journey, not the destination.",
      calmness: "Keep calm and carry on.",
    };
    return quotes[moodType] || "Stay positive!";
  };

  const getMoodSuggestion = (moodType) => {
    const suggestions = {
      stress: "Try some meditation or deep breathing exercises to relax.",
      happiness: "Keep spreading positivity and maybe share it with others!",
      energy: "Channel that energy into a productive task or exercise!",
      focus: "Use this focus to knock out some tasks or work on a project.",
      calmness:
        "Maintain this calmness by engaging in a peaceful activity like reading.",
    };
    return suggestions[moodType] || "Take care of yourself!";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { calmness, date, description, energy, focus, happiness, stress } =
      mood;
    if (
      !calmness ||
      !date ||
      !description ||
      !energy ||
      !focus ||
      !happiness ||
      !stress
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
      });
      return;
    }

    try {
      const response = await addMoodEntryAPI(mood);
      console.log("Mood entry successful", response);

      const highestMood = getHighestMood();
      const moodQuote = getMoodQuote(highestMood);
      const moodSuggestion = getMoodSuggestion(highestMood);
      setQuote(moodQuote);
      setSuggestion(moodSuggestion);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your mood entry has been logged successfully.",
      });
    } catch (error) {
      console.error("Could not log mood:", error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Could not log your mood. Please try again.",
      });
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "black" }}>
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
                  fontSize: "28px",
                  color: "#f5f5f5",
                }}
              >
                Mood Logger
              </h1>
              <form onSubmit={handleSubmit}>
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: "15px",
                    fontSize: "18px",
                    color: "#e0e0e0",
                  }}
                >
                  How do you feel today?
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  {["stress", "happiness", "energy", "focus", "calmness"].map(
                    (moodType) => (
                      <div
                        key={moodType}
                        style={{ flex: "1 0 45%", minWidth: "150px" }}
                      >
                        <label
                          style={{
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "5px",
                            color: "#f5f5f5",
                          }}
                        >
                          {moodType.charAt(0).toUpperCase() + moodType.slice(1)}
                        </label>
                        <DiscreteSliderMarks
                          value={mood[moodType]}
                          onChange={(value) => handleChange(moodType, value)}
                        />
                      </div>
                    )
                  )}
                </div>
                <div style={{ marginTop: "20px" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      display: "block",
                      marginBottom: "5px",
                      color: "#f5f5f5",
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    rows="4"
                    placeholder="How are you feeling today?"
                    value={mood.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      resize: "none",
                      backgroundColor: "#333",
                      color: "#f5f5f5",
                    }}
                  />
                </div>

                <div style={{ marginTop: "10px" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      display: "block",
                      marginBottom: "5px",
                      color: "#f5f5f5",
                    }}
                  >
                    Date
                  </label>
                  <input
                    max={new Date().toISOString().split('T')[0]}
                    type="date"
                    value={mood.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      backgroundColor: "#333",
                      color: "#f5f5f5",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: "20px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    backgroundColor: "#6B46C1",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: "none",
                    color: "#fff",
                  }}
                >
                  Log Mood
                </button>
              </form>

              {quote && (
                <div
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    color: "#f5f5f5",
                  }}
                >
                  <h3>Your Mood Quote:</h3>
                  <p>{quote}</p>
                </div>
              )}

              {suggestion && (
                <div
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    color: "#f5f5f5",
                  }}
                >
                  <h3>Suggestion:</h3>
                  <p>{suggestion}</p>
                </div>
              )}
            </div>
          </div>
        </Vortex>
      </div>
    </>
  );
};

export default MoodLogger;
