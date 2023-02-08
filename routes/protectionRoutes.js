import express from "express";
import {
    readProtections,
    createProtection,
    updateProtection,
    deleteProtection,
    deleteProtections,
} from "../controllers/protectionController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, readProtections);
router.post("/", checkAuth, createProtection);
router.put("/:id", checkAuth, updateProtection);
router.delete("/:id", checkAuth, deleteProtection);
router.delete("/", checkAuth, deleteProtections);

export default router;
