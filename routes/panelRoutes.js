import express from "express";
import {
    readPanels,
    createPanel,
    updatePanel,
    deletePanel,
    deletePanels,
} from "../controllers/panelController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, readPanels);
router.post("/", checkAuth, createPanel);
router.put("/:id", checkAuth, updatePanel);
router.delete("/:id", checkAuth, deletePanel);
router.delete("/", checkAuth, deletePanels);

export default router;
