import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getUserSleepAPI } from "../utils/apiRequest";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SleepGraph = ({ selectedDate }) => {
  const [sleepLogs, setSleepLogs] = useState([]);

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

  // Filter sleep logs by the selected date
  const filteredLogs = sleepLogs.filter(
    (log) => new Date(log.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
  );

  if (filteredLogs.length === 0) {
    return (
      <p>
        No sleep data available for the selected date. Please log some sleep
        entries.
      </p>
    );
  }

  // Prepare the data for the bar chart
  const barData = {
    labels: filteredLogs.map((log) => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: "Sleep Duration (hours)",
        data: filteredLogs.map((log) => log.duration),
        backgroundColor: "rgba(0, 123, 255, 0.6)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Sleep Quality (%)",
        data: filteredLogs.map((log) => log.quality),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Sleep Tracker Data for ${selectedDate}`,
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", marginTop: "2rem" }}>
      <Bar data={barData} options={barOptions} />
    </div>
  );
};

export default SleepGraph;
