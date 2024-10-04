import Mood from '../models/MoodModel.js';
import User from '../models/UserModel.js';

export const createMood = async (req, res) => {
  const { stress, energy, happiness, calmness, focus, description, date } = req.body;

  try {
    const newMood = new Mood({
      stress, 
      energy, 
      happiness, 
      calmness, 
      focus,
      description,
      date,
      user: req.user.id 
    });

    const savedMood = await newMood.save();

    const user = await User.findById(req.user.id);
    user.moods.push(savedMood._id);
    await user.save();

    res.status(201).json(savedMood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserMoods = async (req, res) => {
  try {
    console.log(req.user);
    const moods = await Mood.find({user: req.user.id});
    res.status(200).json(moods);
  } catch (error) {
    console.error("Error in getUserMoods:", error); 
    res.status(500).json({ message: error.message });
  }
};

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

export const updateMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood || mood.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Mood not found" });
    }

    mood.focus = req.body.focus || mood.focus;
    mood.calmness = req.body.calmness || mood.calmness;
    mood.energy = req.body.energy || mood.energy;
    mood.happiness = req.body.happiness || mood.happiness;
    mood.stress = req.body.stress || mood.stress;
    mood.description = req.body.description || mood.description;
    mood.date = req.body.date || mood.date;

    const updatedMood = await mood.save();
    res.status(200).json(updatedMood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood || mood.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Mood not found" });
    }

    await mood.remove();
    
    const user = await User.findById(req.user.id);
    user.moods = user.moods.filter(m => m.toString() !== req.params.id);
    await user.save();

    res.status(200).json({ message: "Mood deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
