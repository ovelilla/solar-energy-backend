import express from "express";
import {
    readHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    deleteHabits,
} from "../controllers/habitController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, readHabits);
router.post("/", checkAuth, createHabit);
router.put("/:id", checkAuth, updateHabit);
router.delete("/:id", checkAuth, deleteHabit);
router.delete("/", checkAuth, deleteHabits);

export default router;
