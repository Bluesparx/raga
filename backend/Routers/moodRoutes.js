import express from "express";
import { createMood, getUserMoods, getMoodById, updateMood, deleteMood } from "../Controllers/MoodController.js";
import { protect } from "../middleware/authMiddleware.js"; // Assuming you have user authentication middleware

const router = express.Router();

router.post("/", protect, createMood);          // Create a new mood entry
router.get("/", protect, getUserMoods);         // Get all mood entries for the logged-in user
router.get("/:id", protect, getMoodById);       // Get a specific mood entry
router.put("/:id", protect, updateMood);        // Update a mood entry
router.delete("/:id", protect, deleteMood);     // Delete a mood entry

export default router;
