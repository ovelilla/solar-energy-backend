import express from "express";
import {
    readPeripherals,
    createPeripheral,
    updatePeripheral,
    updateActive,
    deletePeripheral,
    deletePeripherals,
} from "../controllers/peripheralController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", readPeripherals);
router.post("/", checkAuth, createPeripheral);
router.put("/:id", checkAuth, updatePeripheral);
router.put("/:id/active", checkAuth, updateActive);
router.delete("/:id", checkAuth, deletePeripheral);
router.delete("/", checkAuth, deletePeripherals);

export default router;
