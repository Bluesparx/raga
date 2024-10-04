import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Vortex } from './ui/vortex';
import { Navbar2 } from './Navbar2';

const MoodCalendar = () => {
    const [value, setValue] = useState(new Date());
    const [moods, setMoods] = useState({}); // Store moods with date as the key

    useEffect(() => {
        // Fetch moods from the database
        const fetchMoods = async () => {
            try {
                const response = await fetch('/api/moods'); // Adjust the API endpoint as needed
                const data = await response.json();
                const moodMap = {};

                // Transform data into a key-value format
                data.forEach(moodEntry => {
                    const date = new Date(moodEntry.date).toLocaleDateString(); // Format date
                    moodMap[date] = moodEntry.mood; // Assuming moodEntry has 'date' and 'mood'
                });

                setMoods(moodMap);
            } catch (error) {
                console.error('Error fetching moods:', error);
            }
        };

        fetchMoods();
    }, []);

    const handleDateChange = (newDate) => {
        setValue(newDate);
    };

    // Get the mood for the selected date
    const getMoodForDate = (date) => {
        const formattedDate = date.toLocaleDateString();
        return moods[formattedDate] || 'No mood recorded';
    };

    // Check if the date is in the future
    const isFutureDate = (date) => {
        const today = new Date();
        return date > today;
    };

    return (
        <div className="flex flex-col items-center justify-around bg-black text-white p-1">
            <h1 className="text-3xl mb-4">Mood Calendar</h1>
            <Calendar
                onChange={handleDateChange}
                value={value}
                tileContent={({ date, view }) => {
                   
                    if (view === 'month' && !isFutureDate(date)) {
                        const mood = getMoodForDate(date);
                        return <div>{mood}</div>;
                    }
                    return null; 
                }}
               
                className="bg-gray-800 text-white" 
            />
            <div className="mt-4">
                <h2 className="text-xl">Selected Date: {value.toLocaleDateString()}</h2>
                <p>Mood: {getMoodForDate(value)}</p>
            </div>
        </div>
    );
};

export default MoodCalendar;
