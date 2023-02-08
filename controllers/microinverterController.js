import mongoose from "mongoose";
import Microinverter from "../models/Microinverter.js";

export const readMicroinverters = async (req, res) => {
    try {
        const inverters = await Microinverter.find().sort({ current: 1, power: 1 });

        res.json(inverters);
    } catch (error) {
        console.log(error);
    }
};

export const createMicroinverter = async (req, res) => {
    const { description, power, minCC, maxCC, warranty, current, price } = req.body;

    const errors = {};

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!power) {
        const error = new Error("La potencia es obligatoria");
        errors.power = error.message;
    } else if (isNaN(power)) {
        const error = new Error("La potencia debe ser un número");
        errors.power = error.message;
    }

    if (!minCC) {
        const error = new Error("La CC mínima es obligatoria");
        errors.minCC = error.message;
    } else if (isNaN(minCC)) {
        const error = new Error("La CC mínima debe ser un número");
        errors.minCC = error.message;
    }

    if (!maxCC) {
        const error = new Error("La CC máxima es obligatoria");
        errors.maxCC = error.message;
    } else if (isNaN(maxCC)) {
        const error = new Error("La CC máxima debe ser un número");
        errors.maxCC = error.message;
    }

    if (!warranty) {
        const error = new Error("La garantía es obligatoria");
        errors.warranty = error.message;
    } else if (isNaN(warranty)) {
        const error = new Error("La garantía debe ser un número");
        errors.warranty = error.message;
    }

    if (!current) {
        const error = new Error("La corriente es obligatoria");
        errors.current = error.message;
    } else if (current !== "Monofásico" && current !== "Trifásico") {
        const error = new Error("La corriente debe ser Monofásica o Trifásica");
        errors.current = error.message;
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

    const newMicroinverter = new Microinverter(req.body);

    try {
        const savedMicroinverter = await newMicroinverter.save();

        res.json({
            message: "Microinversor creado correctamente",
            microinverter: savedMicroinverter,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateMicroinverter = async (req, res) => {
    const { id } = req.params;
    const { description, power, minCC, maxCC, warranty, current, price } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El microinversor no existe");
        return res.status(404).json({ message: error.message });
    }

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!power) {
        const error = new Error("La potencia es obligatoria");
        errors.power = error.message;
    } else if (isNaN(power)) {
        const error = new Error("La potencia debe ser un número");
        errors.power = error.message;
    }

    if (!minCC) {
        const error = new Error("La CC mínima es obligatoria");
        errors.minCC = error.message;
    } else if (isNaN(minCC)) {
        const error = new Error("La CC mínima debe ser un número");
        errors.minCC = error.message;
    }

    if (!maxCC) {
        const error = new Error("La CC máxima es obligatoria");
        errors.maxCC = error.message;
    } else if (isNaN(maxCC)) {
        const error = new Error("La CC máxima debe ser un número");
        errors.maxCC = error.message;
    }

    if (!warranty) {
        const error = new Error("La garantía es obligatoria");
        errors.warranty = error.message;
    } else if (isNaN(warranty)) {
        const error = new Error("La garantía debe ser un número");
        errors.warranty = error.message;
    }

    if (!current) {
        const error = new Error("La corriente es obligatoria");
        errors.current = error.message;
    } else if (current !== "Monofásico" && current !== "Trifásico") {
        const error = new Error("La corriente debe ser Monofásica o Trifásica");
        errors.current = error.message;
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

    const foundMicroinverter = await Microinverter.findById(id);

    if (!foundMicroinverter) {
        const error = new Error("El microinversor no existe");
        return res.status(404).json({ message: error.message });
    }

    const updatedMicroinverter = {
        description,
        power,
        minCC,
        maxCC,
        warranty,
        current,
        price,
        _id: id,
    };

    try {
        await Microinverter.findByIdAndUpdate(id, updatedMicroinverter, { new: true });

        res.json({
            message: "Microinversor actualizado correctamente",
            microinverter: updatedMicroinverter,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteMicroinverter = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El microinversor no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundMicroinverter = await Microinverter.findById(id);

    if (!foundMicroinverter) {
        const error = new Error("El microinversor no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Microinverter.findByIdAndRemove(id);

        res.json({ message: "Microinversor eliminado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteMicroinverters = async (req, res) => {
    const { ids } = req.body;

    try {
        await Microinverter.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Microinversores eliminados correctamente" });
    } catch (error) {
        console.log(error);
    }
};
