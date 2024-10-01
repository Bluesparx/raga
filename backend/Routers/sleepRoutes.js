import express from "express";
import { createSleep, getSleepById, updateSleep, deleteSleep, getUserSleep } from "../controllers/SleepController.js";
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();
router.post("/", protect, createSleep);
router.get("/:id", protect, getSleepById);
router.put("/:id", protect, updateSleep);
router.delete("/:id", protect, deleteSleep);
router.get("/user", protect, getUserSleep);

export default router;
