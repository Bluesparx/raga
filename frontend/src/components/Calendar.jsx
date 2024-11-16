// Calendar.js
import React, { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getUserMoodAPI, getUserSleepAPI } from '../utils/apiRequest';
import Modal from './Modal'; 

const Calendar = () => {
    const [value, setValue] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moods, setMoods] = useState({});
    const [selectedMood, setSelectedMood] = useState({});
    const [sleeps, setSleeps] = useState({});
    const [selectedSleep, setSelectedSleep] = useState({});

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
        fetchMoods();
		fetchSleeps();
    }, []);

    // Handle date selection and modal opening
    const handleDateChange = (newDate) => {
        setValue(newDate);
        const mood = getMoodForDate(newDate);
        const sleep = getSleepForDate(newDate);
		setSelectedMood(mood);
		setSelectedSleep(sleep);

    if (mood.description !== 'No mood recorded' || sleep.description !== 'No sleep recorded') {
        setIsModalOpen(true);
    } else {
        setIsModalOpen(false);
    }
	};

	const getMoodForDate = (date) => {
		const formattedDate = date.toLocaleDateString();
		return moods[formattedDate] || { description: 'No mood recorded', tags: [], date: formattedDate };
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
			<h1 className="text-3xl mb-4">Calendar</h1>
			<ReactCalendar
				onChange={handleDateChange}
				value={value}
				tileContent={({ date, view }) => {
					if (view === 'month' && !isFutureDate(date)) {
						const mood = getMoodForDate(date);
						const sleep = getSleepForDate(date);
						return <div className="text-sm font-light">{mood.happiness} {sleep.duration ? `${sleep.duration}h` : ''}</div>; 
					}
					return null; 
				}}
				className="bg-gray-800 text-white font-bold" 
			/>
			<div className="mt-4">
				<h2 className="text-xl">Selected Date: {value.toLocaleDateString()}</h2>
				<p>Mood: {getMoodForDate(value).description}</p>
				Sleep:{' '}
				{getSleepForDate(value).duration
					? `${getSleepForDate(value).duration} hours`
					: getSleepForDate(value).description}
			</div>

			<Modal 
				isOpen={isModalOpen} 
				onClose={handleCloseModal}
				selectedDate={value} 
				moodDescription={selectedMood.description}
				happiness={selectedMood.happiness}
				calmness={selectedMood.calmness}
				stress={selectedMood.stress}
				focus={selectedMood.focus}
				sleepDescription={selectedSleep.description}
				duration={selectedSleep.duration}
				quality={selectedSleep.quality}
				tags={selectedMood.tags}
				date={selectedMood.date}
			/>
		</div>
	);
};

export default Calendar;
