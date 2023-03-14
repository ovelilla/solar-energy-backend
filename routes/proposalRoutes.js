import express from "express";
import {
    readProposals,
    readProposal,
    readProposalUuid,
    createProposal,
    calculateProposal,
    updateProposal,
    requestProposal,
} from "../controllers/proposalController.js";

const router = express.Router();

router.get("/", readProposals);
router.get("/:id", readProposal);
router.get("/uuid/:uuid", readProposalUuid);
router.post("/", createProposal);
router.post("/calculate", calculateProposal);
router.put("/:id", updateProposal);
router.put("/:id/request", requestProposal);

export default router;
