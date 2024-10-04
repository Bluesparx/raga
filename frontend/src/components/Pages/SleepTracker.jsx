import React, { useState, useEffect } from 'react';
import DiscreteSliderMarks from '../DiscreteSliderMarks'; // Assume this is a slider component you already have
import { Navbar2 } from '../Navbar2';
import { Vortex } from '../ui/vortex';

const SleepTracker = () => {
    const [sleep, setSleep] = useState({
        duration: 6,
        quality: 50,
        date: ''
    });

    const [sleepLogs, setSleepLogs] = useState([]);

    // Load sleep logs from local storage on component mount
    useEffect(() => {
        const savedSleepLogs = JSON.parse(localStorage.getItem('sleepLogs')) || [];
        setSleepLogs(savedSleepLogs);
    }, []);

    const handleChange = (field, value) => {
        setSleep((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { duration, quality, date } = sleep;

        if (!duration || !quality || !date) {
            console.error('Please fill all fields');
            return;
        }

        const newEntry = { duration, quality, date };
        const updatedLogs = [...sleepLogs, newEntry];

        setSleepLogs(updatedLogs);
        localStorage.setItem('sleepLogs', JSON.stringify(updatedLogs));

        // Reset form
        setSleep({
            duration: 6,
            quality: 50,
            date: ''
        });
    };

    return (
        <>
            <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
                <Vortex>
                    <Navbar2 />
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
                            <h1 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '28px', color: '#f5f5f5' }}>Sleep Tracker</h1>
                            <form onSubmit={handleSubmit}>
                                <h2 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '18px', color: '#e0e0e0' }}>Log Your Sleep</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '1 0 45%', minWidth: '150px' }}>
                                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#f5f5f5' }}>
                                            Duration (hours)
                                        </label>
                                        <DiscreteSliderMarks
                                            value={sleep.duration}
                                            min={0}
                                            max={24}
                                            step={1}
                                            onChange={(value) => handleChange('duration', value)}
                                        />
                                    </div>
                                    <div style={{ flex: '1 0 45%', minWidth: '150px' }}>
                                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#f5f5f5' }}>
                                            Quality (%)
                                        </label>
                                        <DiscreteSliderMarks
                                            value={sleep.quality}
                                            onChange={(value) => handleChange('quality', value)}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginTop: '10px' }}>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#f5f5f5' }}>Date</label>
                                    <input
                                        type="date"
                                        value={sleep.date}
                                        onChange={(e) => handleChange('date', e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#333', color: '#f5f5f5' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        marginTop: '20px',
                                        padding: '12px',
                                        backgroundColor: '#6B46C1',
                                        color: 'white',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        border: 'none',
                                        width: '100%',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Log Sleep
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
