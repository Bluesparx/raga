import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { getUserMoodAPI } from "../utils/apiRequest";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const MoodGraph = ({ selectedDate }) => {
  const [moodData, setMoodData] = useState(null);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const moods = await getUserMoodAPI();
        const selectedMood = moods.find(
          (mood) => new Date(mood.date).toLocaleDateString() === selectedDate
        );
        setMoodData(selectedMood);
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };
    fetchMoodData();
  }, [selectedDate]);

  if (!moodData) {
    return (
      <p>
        No mood data found for the selected date. Please log your mood to see
        the graph.
      </p>
    );
  }

  // Prepare data for the radar chart
  const radarData = {
    labels: ["Stress", "Happiness", "Energy", "Focus", "Calmness"],
    datasets: [
      {
        label: "Mood Levels",
        data: [
          moodData.stress,
          moodData.happiness,
          moodData.energy,
          moodData.focus,
          moodData.calmness,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
        fill: true,
      },
    ],
  };

  // The radarOptions object remains the same
  // Reference lines 49-81 from the original MoodGraph.jsx

  return (
    <div style={{ width: "80%", margin: "0 auto", marginTop: "2rem" }}>
      <Radar data={radarData} options={radarOptions} />
    </div>
  );
};

export default MoodGraph;
