import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Vortex } from '../ui/vortex';
import { Navbar2 } from '../Navbar2';
import MoodCalendar from '../MoodCalendar';
const MoodCalendarPage = () => {
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
        <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Vortex>
        <Navbar2 />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "7rem",
            paddingBottom: "4rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "60%",
              padding: "40px",
              backgroundColor: "black",
              borderRadius: "12px",
              boxShadow: "0 1px 10px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
               
            }}
          >
           
           <MoodCalendar/>
        </div>
        </div>
        </Vortex>
        </div>
    );
};

export default MoodCalendarPage;
