import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SleepGraph = () => {
  const [sleepLogs, setSleepLogs] = useState([]);

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem('sleepLogs')) || [];
    setSleepLogs(savedLogs);
  }, []);

  if (sleepLogs.length === 0) {
    return <p>No sleep data available. Please log some sleep entries.</p>;
  }

  const barData = {
    labels: sleepLogs.map(log => log.date),
    datasets: [
      {
        label: 'Sleep Duration (hours)',
        data: sleepLogs.map(log => log.duration),
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Sleep Quality (%)',
        data: sleepLogs.map(log => log.quality),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
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
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sleep Tracker Data',
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', marginTop: '2rem' }}>
      <Bar data={barData} options={barOptions} />
    </div>
  );
};

export default SleepGraph;
