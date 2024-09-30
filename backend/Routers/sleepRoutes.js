import express from "express";
import { createSleep, getUserSleepEntries, getSleepById, updateSleep, deleteSleep } from "../Controllers/SleepController.js";
import { protect } from "../middleware/authMiddleware.js"; // Assuming you have user authentication middleware

const router = express.Router();

router.post("/", protect, createSleep);           // Create a new sleep entry
router.get("/", protect, getUserSleepEntries);    // Get all sleep entries for the logged-in user
router.get("/:id", protect, getSleepById);        // Get a specific sleep entry
router.put("/:id", protect, updateSleep);         // Update a sleep entry
router.delete("/:id", protect, deleteSleep);      // Delete a sleep entry

export default router;
