import mongoose from "mongoose";
import Meter from "../models/Meter.js";

export const readMeters = async (req, res) => {
    try {
        const meters = await Meter.find().sort({ current: 1, power: 1 });

        res.json(meters);
    } catch (error) {
        console.log(error);
    }
};

export const createMeter = async (req, res) => {
    const { description, minPanels, maxPanels, current, type, price } = req.body;

    const errors = {};

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!minPanels) {
        const error = new Error("Los paneles mínimos son obligatorios");
        errors.minPanels = error.message;
    } else if (isNaN(minPanels)) {
        const error = new Error("Los paneles mínimos deben ser un número");
        errors.minPanels = error.message;
    }

    if (!maxPanels) {
        const error = new Error("Los paneles máximos son obligatorios");
        errors.maxPanels = error.message;
    } else if (isNaN(maxPanels)) {
        const error = new Error("Los paneles máximos deben ser un número");
        errors.maxPanels = error.message;
    }

    if (!current) {
        const error = new Error("La corriente es obligatoria");
        errors.current = error.message;
    } else if (current !== "Monofásico" && current !== "Trifásico") {
        const error = new Error("La corriente debe ser Monofásica o Trifásica");
        errors.current = error.message;
    }

    if (!type) {
        const error = new Error("El tipo es obligatorio");
        errors.type = error.message;
    } else if (type !== "String" && type !== "Microinversor") {
        const error = new Error("El tipo debe ser String o Microinversor");
        errors.type = error.message;
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

    const newMeter = new Meter(req.body);

    try {
        const savedMeter = await newMeter.save();

        res.json({ message: "Meter creado correctamente", meter: savedMeter });
    } catch (error) {
        console.log(error);
    }
};

export const updateMeter = async (req, res) => {
    const { id } = req.params;
    const { description, minPanels, maxPanels, current, type, price } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La meter no existe");
        errors.meter = error.message;
    }

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!minPanels) {
        const error = new Error("Los paneles mínimos son obligatorios");
        errors.minPanels = error.message;
    } else if (isNaN(minPanels)) {
        const error = new Error("Los paneles mínimos deben ser un número");
        errors.minPanels = error.message;
    }

    if (!maxPanels) {
        const error = new Error("Los paneles máximos son obligatorios");
        errors.maxPanels = error.message;
    } else if (isNaN(maxPanels)) {
        const error = new Error("Los paneles máximos deben ser un número");
        errors.maxPanels = error.message;
    }

    if (!current) {
        const error = new Error("La corriente es obligatoria");
        errors.current = error.message;
    } else if (current !== "Monofásico" && current !== "Trifásico") {
        const error = new Error("La corriente debe ser Monofásica o Trifásica");
        errors.current = error.message;
    }

    if (!type) {
        const error = new Error("El tipo es obligatorio");
        errors.type = error.message;
    } else if (type !== "String" && type !== "Microinversor") {
        const error = new Error("El tipo debe ser String o Microinversor");
        errors.type = error.message;
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

    const foundMeter = await Meter.findById(id);

    if (!foundMeter) {
        const error = new Error("El meter no existe");
        return res.status(404).json({ message: error.message });
    }

    const updatedMeter = {
        description,
        minPanels,
        maxPanels,
        current,
        type,
        price,
        _id: id,
    };

    try {
        await Meter.findByIdAndUpdate(id, updatedMeter, { new: true });

        res.json({
            message: "Meter actualizado correctamente",
            meter: updatedMeter,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteMeter = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El meter no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundMeter = await Meter.findById(id);

    if (!foundMeter) {
        const error = new Error("El meter no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Meter.findByIdAndRemove(id);

        res.json({ message: "Meter eliminado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteMeters = async (req, res) => {
    const { ids } = req.body;

    try {
        await Meter.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Meters eliminados correctamente" });
    } catch (error) {
        console.log(error);
    }
};
