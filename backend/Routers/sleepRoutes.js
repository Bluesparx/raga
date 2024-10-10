import express from "express";
import { createSleep, getSleepById, updateSleep, deleteSleep, getUserSleep } from "../controllers/sleepController.js";
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();
router.post("/", protect, createSleep);
router.get("/user", protect, getUserSleep);
router.get("/:id", protect, getSleepById);
router.put("/:id", protect, updateSleep);
router.delete("/:id", protect, deleteSleep);

export default router;
