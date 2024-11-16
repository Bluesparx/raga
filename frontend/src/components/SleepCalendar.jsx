// SleepCalendar.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getUserSleepAPI } from '../utils/apiRequest';
import Modal from './ModalSleep'; 

const SleepCalendar = () => {
    const [value, setValue] = useState(new Date());
    const [sleeps, setSleeps] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSleep, setSelectedSleep] = useState({});

    const fetchSleeps = async () => {
        try {
            const userSleeps = await getUserSleepAPI();
            const formattedSleeps = userSleeps.reduce((acc, sleep) => {
                const formattedDate = new Date(sleep.date).toLocaleDateString();
                acc[formattedDate] = sleep; 
                return acc;
            }, {});
			console.log(formattedSleeps);
            setSleeps(formattedSleeps);
        } catch (error) {
            console.error("Error fetching user sleeps:", error);
        }
    };

    useEffect(() => {
        fetchSleeps();
    }, []);

    // Handle date selection and modal opening
    const handleDateChange = (newDate) => {
        setValue(newDate);
        const sleep = getSleepForDate(newDate);
        if (sleep.description !== 'No sleep recorded') {
            setSelectedSleep(sleep);
            setIsModalOpen(true);
        } else {
            setSelectedSleep({}); 
            setIsModalOpen(false);
        }
    };

    const getSleepForDate = (date) => {
        const formattedDate = date.toLocaleDateString();
        return sleeps[formattedDate] || { description: 'No sleep recorded', tags: [], date: formattedDate };
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
            <h1 className="text-3xl mb-4">Sleep Calendar</h1>
            <Calendar
                onChange={handleDateChange}
                value={value}
                tileContent={({ date, view }) => {
                    if (view === 'month' && !isFutureDate(date)) {
                        const sleep = getSleepForDate(date);
                        return <div>{sleep.happiness}</div>; 
                    }
                    return null; 
                }}
                className="bg-gray-800 text-white" 
            />
            <div className="mt-4">
                <h2 className="text-xl">Selected Date: {value.toLocaleDateString()}</h2>
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                selectedDate={value} 
                duration={selectedSleep.duration}
                quality={selectedSleep.quality}
                tags={selectedSleep.tags}
                date={selectedSleep.date}
            />
        </div>
    );
};

export default SleepCalendar;
