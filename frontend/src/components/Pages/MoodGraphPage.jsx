import React, { useState } from 'react';
import DiscreteSliderMarks from '../DiscreteSliderMarks';
import { Navbar2 } from '../Navbar2';
import { Vortex } from '../ui/vortex';
import MoodGraph from '../MoodGraph';

const MoodGraphPage = () => {
    const [selectedDate, setSelectedDate] = useState('');

    // Handle date input change
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        <>
            <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
                <Vortex>
                    {/* <Navbar2 /> */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '7rem', paddingBottom: '4rem' }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '60%',
                            padding: '40px',
                            backgroundColor: 'black',
                            borderRadius: '12px',
                            boxShadow: '0 1px 10px rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}>
                            <h1 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '28px', color: '#f5f5f5' }}>Mood Graph</h1>
                            
                            {/* Date Picker */}
                            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                                <label htmlFor="date" style={{ color: '#f5f5f5', fontSize: '18px' }}>
                                    Select a date to view the mood graph:
                                </label>
                                <input
                                    max={new Date().toISOString().split('T')[0]}
                                    type="date"
                                    id="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    style={{
                                        display: 'block',
                                        margin: '10px auto',
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: '1px solid rgba(255, 255, 255, 0.5)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: '#f5f5f5',
                                    }}
                                />
                            </div>

                            {/* Display Mood Graph */}
                            {selectedDate ? (
                                <MoodGraph selectedDate={selectedDate} />
                            ) : (
                                <p style={{ textAlign: 'center', color: '#f5f5f5' }}>Please select a date to view the mood graph.</p>
                            )}
                        </div>
                    </div>
                </Vortex>
            </div>
        </>
    );
};

export default MoodGraphPage;
