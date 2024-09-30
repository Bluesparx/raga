import React, { useState } from 'react';

function MoodLogger() {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send mood data to backend
    console.log('Mood:', mood, 'Note:', note);
  };

  return (
    <div>
      <h2>Log Your Mood</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Mood (1-10):
          <input
            type="number"
            min="1"
            max="10"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
        </label>
        <label>
          Notes:
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <button type="submit">Log Mood</button>
      </form>
    </div>
  );
}

export default MoodLogger;