import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import audio from '../../assets/meditation.mp3';

const BreathingGame = () => {
  const [phase, setPhase] = useState('Inhale');
  const [progress, setProgress] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);
  
  const audioRef = useRef(null);
  const synth = window.speechSynthesis;

  const phases = [
    { name: 'Inhale', duration: 4000, color: 'from-cyan-400 to-blue-500' },
    { name: 'Hold', duration: 4000, color: 'from-blue-500 to-indigo-600' },
    { name: 'Exhale', duration: 4000, color: 'from-indigo-600 to-purple-700' },
    { name: 'Rest', duration: 2000, color: 'from-purple-700 to-pink-600' },
  ];

  useEffect(() => {
    let currentPhase = 0;
    let interval;
    
    const runPhases = () => {
        if (!isPlaying) return;
      
        let currentProgress = 0; // Initialize progress for the current phase
        setPhase(phases[currentPhase].name);
        setProgress(0);
        
        if (isTTSEnabled) {
          speak(phases[currentPhase].name);
        }
      
        interval = setInterval(() => {
          currentProgress += (100 / (phases[currentPhase].duration / 100));
          setProgress(currentProgress);
      
          if (currentProgress >= 100) {
            clearInterval(interval);
            currentPhase = (currentPhase + 1) % phases.length;
            if (currentPhase === 0) {
              setCycles((prevCycles) => prevCycles + 1);
            }
            runPhases(); 
          }
        }, 100); 
      };
        

    if (isPlaying) {
      runPhases();
    }

    return () => clearInterval(interval);
  }, [isPlaying, isTTSEnabled]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setPhase('Inhale');
    setProgress(0);
    setCycles(0);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const toggleTTS = () => {
    setIsTTSEnabled(!isTTSEnabled);
  };

  const speak = (text) => {
    if (synth.speaking) {
      synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <div className={`flex flex-col justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Breathing Exercise</h1>
        <p className="text-xl">Completed Cycles: {cycles}</p>
      </div>

     
      <div className="relative w-80 h-80">
        {phases.map((p, index) => (
          <div
            key={p.name}
            className={`absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center shadow-lg transition-all duration-1000 ease-in-out 
              bg-gradient-to-br ${p.color}
              ${phase === p.name ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ zIndex: phase === p.name ? 10 : 0 }}
          >
            <p className="text-3xl font-bold text-white">{p.name}</p>
          </div>
        ))}
      </div>

      {/* Progress Tracker */}
      <div className="mt-8 w-64">
        <div className={`h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full`}>
          <div
            className="h-2 bg-green-500 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={togglePlayPause}
          className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300`}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={resetGame}
          className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white transition-colors duration-300`}
        >
          Reset
        </button>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-700 hover:bg-gray-800'} text-gray-900 transition-colors duration-300`}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button
          onClick={toggleMusic}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors duration-300`}
        >
          {isMusicPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        <button
          onClick={toggleTTS}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white transition-colors duration-300`}
        >
          {isTTSEnabled ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
      </div>

      <audio
        ref={audioRef}
        loop
        src={audio}
      />
    </div>
  );
};

export default BreathingGame;