import express from "express";
import {
    readContacts,
    createContact,
    updateContact,
    deleteContact,
    deleteContacts,
} from "../controllers/contactController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, readContacts);
router.post("/", checkAuth, createContact);
router.put("/:id", checkAuth, updateContact);
router.delete("/:id", checkAuth, deleteContact);
router.delete("/", checkAuth, deleteContacts);

export default router;
