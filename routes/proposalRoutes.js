import express from "express";
import {
    readProposals,
    readProposal,
    readProposalUuid,
    createProposal,
    calculateProposal,
    updateProposal,
} from "../controllers/proposalController.js";

const router = express.Router();

router.get("/", readProposals);
router.get("/:id", readProposal);
router.get("/uuid/:uuid", readProposalUuid);
router.post("/", createProposal);
router.post("/calculate", calculateProposal);
router.put("/:id", updateProposal);

export default router;
