import express from "express";
import {
    readPredefined,
    createPredefined,
    updatePredefined,
    deletePredefined,
} from "../controllers/predefinedController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", readPredefined);
router.post("/", createPredefined);
router.put("/:id", checkAuth, updatePredefined);
router.delete("/:id", checkAuth, deletePredefined);

export default router;
