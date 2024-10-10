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
        console.log("Selected Date:", selectedDate);
        const selectedDateFormatted = new Date(selectedDate).toISOString().split("T")[0];

        const selectedMood = moods.find((mood) => {
          const moodDateFormatted = new Date(mood.date).toISOString().split("T")[0]; // Format the mood date
          // console.log("Mood Date:", moodDateFormatted);
        
          // Compare 
          return moodDateFormatted === selectedDateFormatted;
        });

        setMoodData(selectedMood);
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };
    fetchMoodData();
  }, [selectedDate]);
  

  if (!moodData) {
    return (
      <p className="text-gray-100">
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

    // Chart options for radar styling
    const radarOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 10,
            backdropColor: 'transparent',
          },
          grid: {
            color: 'white',
          },
          angleLines: {
            color: 'white',
          },
          pointLabels: {
            color: 'white', // Change the radar chart labels to white
            font: {
              size: 14, 
            },
          },
        },
      },
    };
  return (
    <div style={{ width: "80%", margin: "0 auto", marginTop: "2rem" }}>
      <Radar data={radarData} options={radarOptions} />
    </div>
  );
};

export default MoodGraph;
