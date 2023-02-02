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
        errors.orientation = error.message;
    }

    if (!type) {
        const error = new Error("El tipo es obligatorio");
        errors.type = error.message;
    }

    if (!performance) {
        const error = new Error("El rendimiento es obligatorio");
        errors.performance = error.message;
    }

    if (performance && isNaN(performance)) {
        const error = new Error("El rendimiento debe ser un número");
        errors.performance = error.message;
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

export const updateOrientation = async (req, res) => {
    const { id } = req.params;
    const { orientation, type, performance } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La orientación no existe");
        errors.orientation = error.message;
    }

    if (!orientation) {
        const error = new Error("La orientación es obligatoria");
        errors.orientation = error.message;
    }

    if (!type) {
        const error = new Error("El tipo es obligatorio");
        errors.type = error.message;
    }

    if (!performance) {
        const error = new Error("El rendimiento es obligatorio");
        errors.performance = error.message;
    }

    if (performance && isNaN(performance)) {
        const error = new Error("El rendimiento debe ser un número");
        errors.performance = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const foundOrientation = await Orientation.findById(id);

    if (!foundOrientation) {
        const error = new Error("La orientación no existe");
        return res.status(404).json({ message: error.message });
    }

    const updatedOrientation = { orientation, type, performance, _id: id };

    try {
        await Orientation.findByIdAndUpdate(id, updatedOrientation, { new: true });

        res.json({
            message: "Orientación actualizada correctamente",
            orientation: updatedOrientation,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteOrientation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La orientación no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundOrientation = await Orientation.findById(id);

    if (!foundOrientation) {
        const error = new Error("La orientación no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Orientation.findByIdAndRemove(id);

        res.json({ message: "Orientación eliminada correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteOrientations = async (req, res) => {
    const { ids } = req.body;

    try {
        await Orientation.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Orientaciones eliminadas correctamente" });
    } catch (error) {
        console.log(error);
    }
};
