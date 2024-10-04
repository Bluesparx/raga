import React, { useState, useEffect } from 'react';
import DiscreteSliderMarks from '../DiscreteSliderMarks';
import { Navbar2 } from '../Navbar2';
import { Vortex } from '../ui/vortex';
import { addMoodEntryAPI } from '../../utils/apiRequest';

const MoodLogger = () => {
  // Load mood from local storage or use default values
  const [mood, setMood] = useState(() => {
    const savedMood = localStorage.getItem('mood');
    return savedMood
      ? JSON.parse(savedMood)
      : {
          stress: 50,
          happiness: 50,
          energy: 50,
          focus: 50,
          calmness: 50,
          description: '',
          date: '',
        };
  });

  const [quote, setQuote] = useState(''); // State to hold the mood quote

  useEffect(() => {
    // Save the mood to local storage whenever it changes
    localStorage.setItem('mood', JSON.stringify(mood));
  }, [mood]);

  const handleChange = (field, value) => {
    setMood((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getHighestMood = () => {
    // Get the mood with the highest score
    const moodScores = {
      stress: mood.stress,
      happiness: mood.happiness,
      energy: mood.energy,
      focus: mood.focus,
      calmness: mood.calmness,
    };
    const highestMood = Object.keys(moodScores).reduce((a, b) =>
      moodScores[a] > moodScores[b] ? a : b
    );

    return highestMood;
  };

  const getMoodQuote = (moodType) => {
    const quotes = {
      stress: 'Take a deep breath. It’s just a bad day, not a bad life.',
      happiness: 'Happiness is not by chance, but by choice.',
      energy: 'Energy and persistence conquer all things.',
      focus: 'Focus on the journey, not the destination.',
      calmness: 'Keep calm and carry on.',
    };
    return quotes[moodType] || 'Stay positive!';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { calmness, date, description, energy, focus, happiness, stress } = mood;
    if (!calmness || !date || !description || !energy || !focus || !happiness || !stress) {
      console.error('Please fill all fields');
      return;
    }

    console.log('Submitted Mood:', mood);

    // Get the highest mood and the corresponding quote
    const highestMood = getHighestMood();
    const moodQuote = getMoodQuote(highestMood);
    setQuote(moodQuote);

   

    try {
      const response = await addMoodEntryAPI({ calmness, date, description, energy, focus, happiness, stress });
      console.log('Mood entry successful', response);
      // Clear the local storage after successful submission
     
    } catch (error) {
      console.error('Could not log mood:', error);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: 'black' }}>
        <Vortex>
          <Navbar2 />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '7rem',
              paddingBottom: '4rem',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '60%',
                padding: '40px',
                backgroundColor: 'black',
                borderRadius: '12px',
                boxShadow: '0 1px 10px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <h1 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '28px', color: '#f5f5f5' }}>
                Mood Logger
              </h1>
              <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '18px', color: '#e0e0e0' }}>
                  How do you feel today?
                </h2>
                <div style={{ display: 'flex', justifyContent: 'space-around', gap: '1rem', flexWrap: 'wrap' }}>
                  {['stress', 'happiness', 'energy', 'focus', 'calmness'].map((moodType) => (
                    <div key={moodType} style={{ flex: '1 0 45%', minWidth: '150px' }}>
                      <label
                        style={{
                          fontWeight: 'bold',
                          display: 'block',
                          marginBottom: '5px',
                          color: '#f5f5f5',
                        }}
                      >
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
                  <label
                    style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#f5f5f5' }}
                  >
                    Description
                  </label>
                  <textarea
                    rows="4"
                    placeholder="How are you feeling today?"
                    value={mood.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      resize: 'none',
                      backgroundColor: '#333',
                      color: '#f5f5f5',
                    }}
                  />
                </div>

                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#f5f5f5' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={mood.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      backgroundColor: '#333',
                      color: '#f5f5f5',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: '20px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    backgroundColor: '#6B46C1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: 'none',
                    color: '#fff',
                  }}
                >
                  Log Mood
                </button>
              </form>

              {quote && (
                <div style={{ marginTop: '20px', textAlign: 'center', color: '#f5f5f5' }}>
                  <h3>Your Mood Quote:</h3>
                  <p>{quote}</p>
                </div>
              )}
            </div>
          </div>
        </Vortex>
      </div>
    </>
  );
};

export default MoodLogger;
