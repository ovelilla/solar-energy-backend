import express from "express";
import { getRate } from "../controllers/rateController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", getRate);

export default router;
