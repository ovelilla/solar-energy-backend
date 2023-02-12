import express from "express";
import {
    readStructures,
    createStructure,
    updateStructure,
    deleteStructure,
    deleteStructures,
} from "../controllers/structureController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", readStructures);
router.post("/", checkAuth, createStructure);
router.put("/:id", checkAuth, updateStructure);
router.delete("/:id", checkAuth, deleteStructure);
router.delete("/", checkAuth, deleteStructures);

export default router;
