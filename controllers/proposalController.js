import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import Proposal from "../models/Proposal.js";

export const readProposals = async (req, res) => {
    try {
        const proposals = await Proposal.find();

        res.json(proposals);
    } catch (error) {
        console.log(error);
    }
};

export const createProposal = async (req, res) => {
    const {
        placeId,
        address,
        latitude,
        longitude,
        consumption,
        kWhConsumed,
        contractedPower,
        panelsNumber,
        installationType,
        hasBattery,
        batteryBrand,
        paymenMethod,
    } = req.body;

    const errors = {};

    if (!placeId) {
        const error = new Error("El placeId es obligatorio");
        errors.placeId = error.message;
    }

    if (!address) {
        const error = new Error("La dirección es obligatoria");
        errors.address = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const uuid = uuidv4();
    req.body.uuid = uuid;

    const proposal = new Proposal(req.body);

    try {
        const savedProposal = await proposal.save();

        res.json({ message: "Propuesta creada correctamente", proposal: savedProposal });
    } catch (error) {
        console.log(error);
    }
};
