import mongoose from "mongoose";
import Orientation from "../models/Orientation.js";

export const readOrientations = async (req, res) => {
    try {
        const orientations = await Orientation.find();

        res.json(orientations);
    } catch (error) {
        console.log(error);
    }
};

export const createOrientation = async (req, res) => {
    const { orientation, type, performance } = req.body;

    const errors = {};

    if (!orientation) {
        const error = new Error("La orientación es obligatoria");
        errors.placeId = error.message;
    }

    if (!type) {
        const error = new Error("El tipo es obligatorio");
        errors.address = error.message;
    }

    if (!performance) {
        const error = new Error("El rendimiento es obligatorio");
        errors.address = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const newOrientation = new Orientation(req.body);

    try {
        const savedOrientation = await newOrientation.save();

        res.json({ message: "Orientación creada correctamente", orientation: savedOrientation });
    } catch (error) {
        console.log(error);
    }
};
