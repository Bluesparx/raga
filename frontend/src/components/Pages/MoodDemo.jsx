// MoodTable.js
import React, { useEffect, useState } from 'react';
import { getUserMoodAPI } from '../../utils/apiRequest';

const MoodTable = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const data = await getUserMoodAPI(); // Fetch moods from the API
        setMoods(data); // Data should now contain complete mood objects
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Moods</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Stress</th>
            <th>Energy</th>
            <th>Happiness</th>
            <th>Calmness</th>
            <th>Focus</th>
            <th>Description</th>
            <th>Date</th>
            <th>Tags</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {moods.map((mood) => (
            <tr key={mood._id}>
              <td>{mood._id}</td>
              <td>{mood.stress}</td>
              <td>{mood.energy}</td>
              <td>{mood.happiness}</td>
              <td>{mood.calmness}</td>
              <td>{mood.focus}</td>
              <td>{mood.description}</td>
              <td>{new Date(mood.date).toLocaleDateString()}</td>
              <td>{mood.tags.join(', ')}</td>
              <td>
                <button onClick={() => console.log(`Edit mood ${mood._id}`)}>Edit</button>
                <button onClick={() => console.log(`Delete mood ${mood._id}`)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoodTable;
