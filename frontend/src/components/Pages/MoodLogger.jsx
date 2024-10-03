import React, { useState } from 'react';
import DiscreteSliderMarks from '../DiscreteSliderMarks';
import { Navbar2 } from '../Navbar2';
import { Vortex } from '../ui/vortex';
import {addMoodEntryAPI } from '../../utils/apiRequest';

const MoodLogger = () => {
  const [mood, setMood] = useState({
    stress: 50,
    happiness: 50,
    energy: 50,
    focus: 50,
    calmness: 50,
    description: '',
    date: '',
  });

  const handleChange = (field, value) => {
    setMood((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(mood);
    
    const { calmness, date, description, energy, focus, happiness, stress} = mood;
    setMood({
      stress: 50,
      happiness: 50,
      energy: 50,
      focus: 50,
      calmness: 50,
      description: '',
      date: '',
    });
    if (!calmness || !date || !description || !energy ||  !focus|| !happiness || !stress) {
      console.error("Please fill all fields");
      return;
    }

    try {
      const response = await addMoodEntryAPI({ calmness, date, description, energy, focus, happiness, stress});
      console.log('Mood entry successful', response);

    } catch (error) {
      console.error('Could not log mood:', error);
    }
  };

  return (
    <>
      <div style={{backgroundColor: 'black'}}>
        <Vortex>
        <Navbar2 />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '7rem', paddingBottom: '4rem',}}>
          <div style={{ width: '100%',
    maxWidth: '60%',
    padding: '40px',
    backgroundColor: 'black',
    borderRadius: '12px',
    boxShadow: '0 1px 10px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
   }}>
            <h1 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '28px', color: '#f5f5f5' }}>Mood Logger</h1>
            <form onSubmit={handleSubmit}>
              <h2 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '18px', color: '#e0e0e0' }}>How do you feel today?</h2>
              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '1rem', flexWrap: 'wrap' }}>
                {['stress', 'happiness', 'energy', 'focus', 'calmness'].map((moodType) => (
                  <div key={moodType} style={{ flex: '1 0 45%', minWidth: '150px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#f5f5f5' }}>
                      {moodType.charAt(0).toUpperCase() + moodType.slice(1)}
                    </label>
                    <DiscreteSliderMarks
                      value={mood[moodType]}
                      onChange={(value) => handleChange(moodType, value)}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#f5f5f5' }}>Description</label>
                <textarea
                  rows="4"
                  placeholder="How are you feeling today?"
                  value={mood.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none', backgroundColor: '#333', color: '#f5f5f5' }}
                />
              </div>

              <div style={{ marginTop: '10px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#f5f5f5' }}>Date</label>
                <input
                  type="date"
                  value={mood.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#333', color: '#f5f5f5' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '20px',
                  padding: '12px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: 'none',
                  width: '100%',
                  fontWeight: 'bold',
                }}
              >
                Log Mood
              </button>
            </form>
          </div>
        </div>
        
        </Vortex>
      </div>
    
    </>
  );
};

export default MoodLogger;
