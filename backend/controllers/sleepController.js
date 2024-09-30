import Sleep from '../models/SleepModel.js';
import User from '../models/UserModel.js';

// Create a new sleep entry
export const createSleep = async (req, res) => {
  const { sleepDuration, sleepQuality, sleepDate } = req.body;

  try {
    const newSleep = new Sleep({
      sleepDuration,
      sleepQuality,
      sleepDate,
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

export const getUserSleepEntries = async (req, res) => {
  try {
    const sleeps = await Sleep.find({ user: req.user.id });
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

    sleep.sleepDuration = req.body.sleepDuration || sleep.sleepDuration;
    sleep.sleepQuality = req.body.sleepQuality || sleep.sleepQuality;
    sleep.sleepDate = req.body.sleepDate || sleep.sleepDate;

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
