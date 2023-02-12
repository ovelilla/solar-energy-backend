import express from "express";
import {
    readInverters,
    createInverter,
    updateInverter,
    deleteInverter,
    deleteInverters,
} from "../controllers/inverterController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", readInverters);
router.post("/", checkAuth, createInverter);
router.put("/:id", checkAuth, updateInverter);
router.delete("/:id", checkAuth, deleteInverter);
router.delete("/", checkAuth, deleteInverters);

export default router;
