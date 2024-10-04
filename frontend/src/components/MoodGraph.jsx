import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const MoodGraph = () => {
  const [moodData, setMoodData] = useState(null);

  useEffect(() => {
    // Fetch mood data from localStorage
    const savedMood = localStorage.getItem('mood');
    if (savedMood) {
      setMoodData(JSON.parse(savedMood));
    }
  }, []);

  // If no mood data is found, show a message
  if (!moodData) {
    return <p>No mood data found. Please log your mood to see the graph.</p>;
  }

  // Prepare data for the radar chart
  const radarData = {
    labels: ['Stress', 'Happiness', 'Energy', 'Focus', 'Calmness'], // X-axis labels
    datasets: [
      {
        label: 'Mood Levels',
        data: [
          moodData.stress,
          moodData.happiness,
          moodData.energy,
          moodData.focus,
          moodData.calmness,
        ], // Y-axis data points
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        fill: true, // Fill the area under the radar
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
          color: 'rgba(255, 255, 255, 0.2)',
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', marginTop: '2rem' }}>
      <Radar data={radarData} options={radarOptions} />
    </div>
  );
};

export default MoodGraph;
