import express from "express";
import {
    readMicroinverters,
    createMicroinverter,
    updateMicroinverter,
    deleteMicroinverter,
    deleteMicroinverters,
} from "../controllers/microinverterController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, readMicroinverters);
router.post("/", checkAuth, createMicroinverter);
router.put("/:id", checkAuth, updateMicroinverter);
router.delete("/:id", checkAuth, deleteMicroinverter);
router.delete("/", checkAuth, deleteMicroinverters);

export default router;
