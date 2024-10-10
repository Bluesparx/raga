import React, { useState, useEffect } from "react";
import DiscreteSliderMarks from "../DiscreteSliderMarks"; // Assume this is a slider component you already have
import { Navbar2 } from "../Navbar2";
import { Vortex } from "../ui/vortex";
import Swal from "sweetalert2"; // Import SweetAlert2
import { addSleepEntryAPI, getUserSleepAPI } from "../../utils/apiRequest";

const SleepTracker = () => {
  const [sleep, setSleep] = useState({
    duration: 6,
    quality: 50,
    date: "",
  });

  const [sleepLogs, setSleepLogs] = useState([]);
  const [suggestion, setSuggestion] = useState(""); // State to hold the suggestion message

  // Load sleep logs from local storage on component mount
  useEffect(() => {
    const fetchSleepLogs = async () => {
      try {
        const logs = await getUserSleepAPI();
        setSleepLogs(logs);
      } catch (error) {
        console.error("Error fetching sleep logs:", error);
      }
    };
    fetchSleepLogs();
  }, []);

  const handleChange = (field, value) => {
    setSleep((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getSleepSuggestion = (duration) => {
    if (duration < 6) {
      return "It looks like you had a bit less sleep than usual. Consider aiming for 6-8 hours of rest for a more refreshed day!";
    } else if (duration >= 6 && duration <= 8) {
      return "Nice! You are getting an optimal amount of rest with 6-8 hours of sleep. Keep it up!";
    } else {
      return "You had a bit more sleep today. As long as you feel well-rested, that’s great! Try to balance it with 6-8 hours if possible.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { duration, quality, date } = sleep;

    if (!duration || !quality || !date) {
      console.error("Please fill all fields");
      return;
    }

    const newEntry = { duration, quality, date };

    try {
      const savedSleep = await addSleepEntryAPI(newEntry);
      setSleepLogs([...sleepLogs, savedSleep]);

      const sleepSuggestion = getSleepSuggestion(duration);
      setSuggestion(sleepSuggestion);

      Swal.fire({
        title: "Success!",
        text: "Your sleep log has been recorded for this day.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setSleep({
        duration: 6,
        quality: 50,
        date: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to log your sleep. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
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
                  fontSize: "28px",
                  color: "#f5f5f5",
                }}
              >
                Sleep Tracker
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
                  Log Your Sleep
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: "1 0 45%", minWidth: "150px" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "5px",
                        color: "#f5f5f5",
                      }}
                    >
                      Duration (hours)
                    </label>
                    <DiscreteSliderMarks
                      value={sleep.duration}
                      min={0}
                      max={24}
                      step={1}
                      onChange={(value) => handleChange("duration", value)}
                    />
                  </div>
                  <div style={{ flex: "1 0 45%", minWidth: "150px" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "5px",
                        color: "#f5f5f5",
                      }}
                    >
                      Quality (%)
                    </label>
                    <DiscreteSliderMarks
                      value={sleep.quality}
                      onChange={(value) => handleChange("quality", value)}
                    />
                  </div>
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
                    value={sleep.date}
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
                    padding: "12px",
                    backgroundColor: "#6B46C1",
                    color: "white",
                    borderRadius: "5px",
                    cursor: "pointer",
                    border: "none",
                    width: "100%",
                    fontWeight: "bold",
                  }}
                >
                  Log Sleep
                </button>
              </form>

              {/* Display the sleep suggestion */}
              {suggestion && (
                <div
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    color: "#f5f5f5",
                  }}
                >
                  <h3>Sleep Suggestion:</h3>
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

export default SleepTracker;
