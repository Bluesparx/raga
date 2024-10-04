// MoodCalendar.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getUserMoodAPI } from '../utils/apiRequest';
import Modal from './ModalMood'; 

const MoodCalendar = () => {
    const [value, setValue] = useState(new Date());
    const [moods, setMoods] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMood, setSelectedMood] = useState({});

    const fetchMoods = async () => {
        try {
            const userMoods = await getUserMoodAPI();
            const formattedMoods = userMoods.reduce((acc, mood) => {
                const formattedDate = new Date(mood.date).toLocaleDateString();
                acc[formattedDate] = mood; 
                return acc;
            }, {});
            setMoods(formattedMoods);
        } catch (error) {
            console.error("Error fetching user moods:", error);
        }
    };

    useEffect(() => {
        fetchMoods();
    }, []);

    // Handle date selection and modal opening
    const handleDateChange = (newDate) => {
        setValue(newDate);
        const mood = getMoodForDate(newDate);
        if (mood.description !== 'No mood recorded') {
            setSelectedMood(mood);
            setIsModalOpen(true);
        } else {
            setSelectedMood({}); 
            setIsModalOpen(false);
        }
    };

    const getMoodForDate = (date) => {
        const formattedDate = date.toLocaleDateString();
        return moods[formattedDate] || { description: 'No mood recorded', tags: [], date: formattedDate };
    };

    const isFutureDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        return date > today;
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                        return <div>{mood.happiness}</div>; 
                    }
                    return null; 
                }}
                className="bg-gray-800 text-white" 
            />
            <div className="mt-4">
                <h2 className="text-xl">Selected Date: {value.toLocaleDateString()}</h2>
                <p>Mood: {getMoodForDate(value).description}</p>
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                selectedDate={value} 
                happiness={selectedMood.happiness}
                description={selectedMood.description}
                calmness={selectedMood.calmness}
                stress={selectedMood.stress}
                focus={selectedMood.focus}
                tags={selectedMood.tags}
                date={selectedMood.date}
            />
        </div>
    );
};

export default MoodCalendar;
