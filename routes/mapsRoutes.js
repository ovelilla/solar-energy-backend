import express from "express";
import { getPlace } from "../controllers/mapsController.js";

const router = express.Router();

router.get("/place/:id", getPlace);

export default router;
