import express from "express";
import {
    readPanels,
    createPanel,
    updatePanel,
    updateActive,
    deletePanel,
    deletePanels,
} from "../controllers/panelController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", readPanels);
router.post("/", checkAuth, createPanel);
router.put("/:id", checkAuth, updatePanel);
router.put("/:id/active", checkAuth, updateActive);
router.delete("/:id", checkAuth, deletePanel);
router.delete("/", checkAuth, deletePanels);

export default router;
