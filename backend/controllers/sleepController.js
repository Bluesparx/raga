import Sleep from '../models/SleepModel.js';
import User from '../models/UserModel.js';

export const createSleep = async (req, res) => {
  const { duration, quality, date } = req.body;

  try {
    const newSleep = new Sleep({
      duration, 
      quality, 
      date, 
      user: req.user.id 
    });

    const savedSleep = await newSleep.save();

    const user = await User.findById(req.user.id);
    user.sleeps.push(savedSleep._id);
    await user.save();

    res.status(201).json(savedSleep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserSleep = async (req, res) => {
  try {
    const sleeps = await Sleep.find({ user: req.user._id }).exec();
    res.status(200).json(sleeps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSleepById = async (req, res) => {
  try {
    const sleep = await Sleep.findById(req.params.id);

    if (!sleep || sleep.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Sleep entry not found" });
    }

    res.status(200).json(sleep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSleep = async (req, res) => {
  try {
    const sleep = await Sleep.findById(req.params.id);

    if (!sleep || sleep.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Sleep entry not found" });
    }

    sleep.duration = req.body.duration || sleep.duration;
    sleep.qualityuality = req.body.quality || sleep.quality;
    sleep.date = req.body.date || sleep.date;

    const updatedSleep = await sleep.save();
    res.status(200).json(updatedSleep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSleep = async (req, res) => {
  try {
    const sleep = await Sleep.findById(req.params.id);

    if (!sleep || sleep.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Sleep entry not found" });
    }

    await sleep.remove();

    const user = await User.findById(req.user.id);
    user.sleeps = user.sleeps.filter(s => s.toString() !== req.params.id);
    await user.save();

    res.status(200).json({ message: "Sleep entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
