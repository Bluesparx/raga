// MoodModal.jsx
import React, { useState } from 'react';

const MoodModal = ({ isOpen, onClose, onSave }) => {
  const [moodData, setMoodData] = useState({
    stress: '',
    energy: '',
    happiness: '',
    calmness: '',
    focus: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMoodData({ ...moodData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(moodData);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>Add Mood Entry</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Stress:
              <input type="number" name="stress" value={moodData.stress} onChange={handleChange} required />
            </label>
            <label>
              Energy:
              <input type="number" name="energy" value={moodData.energy} onChange={handleChange} required />
            </label>
            <label>
              Happiness:
              <input type="number" name="happiness" value={moodData.happiness} onChange={handleChange} required />
            </label>
            <label>
              Calmness:
              <input type="number" name="calmness" value={moodData.calmness} onChange={handleChange} required />
            </label>
            <label>
              Focus:
              <input type="number" name="focus" value={moodData.focus} onChange={handleChange} required />
            </label>
            <label>
              Description:
              <textarea name="description" value={moodData.description} onChange={handleChange}></textarea>
            </label>
            <label>
              Date:
              <input type="date" name="date" value={moodData.date} onChange={handleChange} />
            </label>
            <button type="submit">Save Mood</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    )
  );
};

export default MoodModal;
