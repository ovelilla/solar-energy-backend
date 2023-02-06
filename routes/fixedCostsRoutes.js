import express from "express";
import {
    readFixedCosts,
    createFixedCosts,
    updateFixedCosts,
    deleteFixedCosts,
} from "../controllers/fixedCostsController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", readFixedCosts);
router.post("/", createFixedCosts);
router.put("/:id", checkAuth, updateFixedCosts);
router.delete("/:id", checkAuth, deleteFixedCosts);

export default router;
