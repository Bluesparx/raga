import React, { useState } from 'react';
import DiscreteSliderMarks from '../DiscreteSliderMarks';
import { Navbar2 } from '../Navbar2';
import { Vortex } from '../ui/vortex';
import { Label } from '@radix-ui/react-label';
import Input from 'postcss/lib/input';

const SleepTracker = () => {
  const [mood, setMood] = useState({
    stress: 50,
    happiness: 50,
    energy: 50,
    focus: 50,
    calmness: 50,
    date: '',
  });

  const handleChange = (field, value) => {
    setMood((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mood);
  };

  return (
    <>
      <div style={{backgroundColor: 'black', minHeight:'100vh'}}>
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
            <h1 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '28px', color: '#f5f5f5' }}>Sleep Tracker</h1>
            <form onSubmit={handleSubmit}>
              <h2 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '18px', color: '#e0e0e0' }}>How was your sleep today?</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                {['stress', 'happiness'].map((moodType) => (
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
                className="relative inline-block px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg overflow-hidden"
               
                style={{
                  marginTop: '20px',
                  position: 'relative',
                  display: 'inline-block',
                  padding: '12px 24px',
                  fontSize: '16px',
                  backgroundColor: '#6B46C1',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  border: 'none',
                  color: '#fff',
                }}
              >
                <span
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-150%',
                    width: '200%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                    animation: 'shimmer 2s infinite',
                  }}
                ></span>
                Track Sleep
              </button>
            </form>
          </div>
        </div>
        
        </Vortex>
      </div>
    </>
  );
};

export default SleepTracker;
