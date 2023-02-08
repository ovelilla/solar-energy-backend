import mongoose from "mongoose";
import Line from "../models/Line.js";

export const readLines = async (req, res) => {
    try {
        const lines = await Line.find();

        res.json(lines);
    } catch (error) {
        console.log(error);
    }
};

export const createLine = async (req, res) => {
    const { description, minPower, maxPower, price } = req.body;

    const errors = {};

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!minPower) {
        const error = new Error("La potencia mínima es obligatoria");
        errors.minPower = error.message;
    } else if (isNaN(minPower)) {
        const error = new Error("La potencia mínima debe ser un número");
        errors.minPower = error.message;
    }

    if (!maxPower) {
        const error = new Error("La potencia máxima es obligatoria");
        errors.maxPower = error.message;
    } else if (isNaN(maxPower)) {
        const error = new Error("La potencia máxima debe ser un número");
        errors.maxPower = error.message;
    }

    if (!price) {
        const error = new Error("El precio es obligatorio");
        errors.price = error.message;
    } else if (isNaN(price)) {
        const error = new Error("El precio debe ser un número");
        errors.price = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const newLine = new Line(req.body);

    try {
        const savedLine = await newLine.save();

        res.json({ message: "Partida creada correctamente", line: savedLine });
    } catch (error) {
        console.log(error);
    }
};

export const updateLine = async (req, res) => {
    const { id } = req.params;
    const { description, minPower, maxPower, price } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La partida no existe");
        return res.status(404).json({ message: error.message });
    }

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!minPower) {
        const error = new Error("La potencia mínima es obligatoria");
        errors.minPower = error.message;
    } else if (isNaN(minPower)) {
        const error = new Error("La potencia mínima debe ser un número");
        errors.minPower = error.message;
    }

    if (!maxPower) {
        const error = new Error("La potencia máxima es obligatoria");
        errors.maxPower = error.message;
    } else if (isNaN(maxPower)) {
        const error = new Error("La potencia máxima debe ser un número");
        errors.maxPower = error.message;
    }

    if (!price) {
        const error = new Error("El precio es obligatorio");
        errors.price = error.message;
    } else if (isNaN(price)) {
        const error = new Error("El precio debe ser un número");
        errors.price = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const foundLine = await Line.findById(id);

    if (!foundLine) {
        const error = new Error("La partida no existe");
        return res.status(404).json({ message: error.message });
    }

    const updatedLine = { description, minPower, maxPower, price, _id: id };

    try {
        await Line.findByIdAndUpdate(id, updatedLine, { new: true });

        res.json({
            message: "Partida actualizada correctamente",
            line: updatedLine,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteLine = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La partida no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundLine = await Line.findById(id);

    if (!foundLine) {
        const error = new Error("La partida no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Line.findByIdAndRemove(id);

        res.json({ message: "Partida eliminada correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteLines = async (req, res) => {
    const { ids } = req.body;

    try {
        await Line.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Partidas eliminadas correctamente" });
    } catch (error) {
        console.log(error);
    }
};
