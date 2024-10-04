import express from "express";
import { 
    createMood, 
    getMoodById, 
    updateMood, 
    deleteMood, 
    getUserMoods 
} from "../controllers/MoodController.js";
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();
router.post("/", protect, createMood); 
router.get("/:id", protect, getMoodById);
router.put("/:id", protect, updateMood);  
router.delete("/:id", protect, deleteMood);  
router.get("/user", protect, getUserMoods); 

export default router;
