import express from "express";
import {
    readProposals,
    readProposal,
    createProposal,
    calculateProposal,
    updateProposal,
} from "../controllers/proposalController.js";

const router = express.Router();

router.get("/", readProposals);
router.get("/:uuid", readProposal);
router.post("/", createProposal);
router.post("/calculate", calculateProposal);
router.put("/:id", updateProposal);

export default router;
