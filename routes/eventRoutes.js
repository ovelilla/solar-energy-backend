import express from "express";
import {
    readEvents,
    createEvent,
    updateEvent,
    updateEventDrop,
    updateEventResize,
    deleteEvent,
} from "../controllers/eventController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, readEvents);
router.post("/", checkAuth, createEvent);
router.put("/:id", checkAuth, updateEvent);
router.patch("/:id/drop", checkAuth, updateEventDrop);
router.patch("/:id/resize", checkAuth, updateEventResize);
router.delete("/:id", checkAuth, deleteEvent);

export default router;
