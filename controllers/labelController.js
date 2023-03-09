import mongoose from "mongoose";
import Label from "../models/Label.js";
import Event from "../models/Event.js";
import getTextColor from "../helpers/getTextColor.js";

export const readLabels = async (req, res) => {
    try {
        const labels = await Label.find();

        res.json(labels);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las etiquetas" });
    }
};

export const createLabel = async (req, res) => {
    const { name, description, color } = req.body;

    const errors = {};

    if (!name) {
        const error = new Error("El nombre es obligatorio");
        errors.name = error.message;
    }

    if (!color) {
        const error = new Error("El color es obligatorio");
        errors.color = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const textColor = getTextColor(color);

    const newLabel = new Label({
        name,
        description,
        color,
        textColor,
    });

    try {
        const savedLabel = await newLabel.save();

        res.json({ message: "Etiqueta creada correctamente", label: savedLabel });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la etiqueta" });
    }
};

export const updateLabel = async (req, res) => {
    const { id } = req.params;
    const { name, description, color } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La etiqueta no existe");
        return res.status(404).json({ message: error.message });
    }

    if (!name) {
        const error = new Error("El nombre es obligatorio");
        errors.name = error.message;
    }

    if (!color) {
        const error = new Error("El color es obligatorio");
        errors.color = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const foundLabel = await Label.findById(id);

    if (!foundLabel) {
        const error = new Error("La etiqueta no existe");
        return res.status(404).json({ message: error.message });
    }

    const textColor = getTextColor(color);

    try {
        const updatedLabel = await Label.findByIdAndUpdate(
            id,
            { name, description, color, textColor, _id: id },
            { new: true }
        );

        res.json({
            message: "Etiqueta actualizada correctamente",
            label: updatedLabel,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la etiqueta" });
    }
};

export const updateLabelEnabled = async (req, res) => {
    const { id } = req.params;
    const { enabled } = req.body;

    try {
        const label = await Label.findById(id);

        if (!label) {
            const error = new Error("La etiqueta no existe");
            return res.status(404).json({ message: error.message });
        }

        label.isEnabled = enabled;

        const updatedLabel = await label.save();

        res.json({
            message: "Etiqueta actualizada correctamente",
            label: updatedLabel,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la etiqueta" });
    }
};

export const updateLabelColor = async (req, res) => {
    const { id } = req.params;
    const { color } = req.body;

    if (!color) {
        const error = new Error("El color es obligatorio");
        return res.status(400).json({ message: error.message });
    }

    try {
        const label = await Label.findById(id);

        if (!label) {
            const error = new Error("La etiqueta no existe");
            return res.status(404).json({ message: error.message });
        }

        const textColor = getTextColor(color);

        label.color = color;
        label.textColor = textColor;

        const updatedLabel = await label.save();

        res.json({
            message: "Etiqueta actualizada correctamente",
            label: updatedLabel,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la etiqueta" });
    }
};

export const deleteLabel = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La etiqueta no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundLabel = await Label.findById(id);

    if (!foundLabel) {
        const error = new Error("La etiqueta no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        const specialLabel = await Label.findOne({ isSpecial: true });
        const specialLabelId = specialLabel ? specialLabel._id : null;

        await Label.findByIdAndRemove(id);
        await Event.updateMany(
            { labelId: id },
            { $set: { labelId: specialLabelId } },
            { multi: true }
        );

        res.json({ message: "Etiqueta eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la etiqueta" });
    }
};
