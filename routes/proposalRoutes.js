import express from "express";
import { readProposals, createProposal } from "../controllers/proposalController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", readProposals);
router.post("/", createProposal);

export default router;
