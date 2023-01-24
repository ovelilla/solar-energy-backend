import express from "express";
import { readOrientations, createOrientation } from "../controllers/orientationController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", readOrientations);
router.post("/", createOrientation);

export default router;
