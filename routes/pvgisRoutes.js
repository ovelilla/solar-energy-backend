import express from "express";
import { getPvgis } from "../controllers/pvgisController.js";

const router = express.Router();

router.post("/", getPvgis);

export default router;
