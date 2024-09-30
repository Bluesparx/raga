import Mood from '../models/MoodModel.js';
import User from '../models/UserModel.js';

// Create a new mood entry
export const createMood = async (req, res) => {
  const { rating, description, date, tags } = req.body;

  try {
    const newMood = new Mood({
      rating,
      description,
      date,
      tags,
      user: req.user.id // assuming req.user is populated with the logged-in user's ID
    });

    const savedMood = await newMood.save();

    // Update the user's mood list
    const user = await User.findById(req.user.id);
    user.moods.push(savedMood._id);
    await user.save();

    res.status(201).json(savedMood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all mood entries for a user
export const getUserMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id });
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single mood entry
export const getMoodById = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood || mood.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Mood not found" });
    }

    res.status(200).json(mood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a mood entry
export const updateMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood || mood.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Mood not found" });
    }

    mood.rating = req.body.rating || mood.rating;
    mood.description = req.body.description || mood.description;
    mood.date = req.body.date || mood.date;
    mood.tags = req.body.tags || mood.tags;

    const updatedMood = await mood.save();
    res.status(200).json(updatedMood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a mood entry
export const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood || mood.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Mood not found" });
    }

    await mood.remove();
    
    // Remove the mood from the user's list
    const user = await User.findById(req.user.id);
    user.moods = user.moods.filter(m => m.toString() !== req.params.id);
    await user.save();

    res.status(200).json({ message: "Mood deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
