import mongoose from "mongoose";
import Inverter from "../models/Inverter.js";

export const readInverters = async (req, res) => {
    try {
        const inverters = await Inverter.find().sort({ current: 1, power: 1 });

        res.json(inverters);
    } catch (error) {
        console.log(error);
    }
};

export const createInverter = async (req, res) => {
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

    const newInverter = new Inverter(req.body);

    try {
        const savedInverter = await newInverter.save();

        res.json({ message: "Inversor creado correctamente", inverter: savedInverter });
    } catch (error) {
        console.log(error);
    }
};

export const updateInverter = async (req, res) => {
    const { id } = req.params;
    const { description, power, minCC, maxCC, warranty, current, price } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La inverter no existe");
        errors.inverter = error.message;
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

    const foundInverter = await Inverter.findById(id);

    if (!foundInverter) {
        const error = new Error("El inversor no existe");
        return res.status(404).json({ message: error.message });
    }

    const updatedInverter = {
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
        await Inverter.findByIdAndUpdate(id, updatedInverter, { new: true });

        res.json({
            message: "Inversor actualizado correctamente",
            inverter: updatedInverter,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteInverter = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El inversor no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundInverter = await Inverter.findById(id);

    if (!foundInverter) {
        const error = new Error("El inversor no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Inverter.findByIdAndRemove(id);

        res.json({ message: "Inversor eliminado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteInverters = async (req, res) => {
    const { ids } = req.body;

    try {
        await Inverter.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Inversores eliminados correctamente" });
    } catch (error) {
        console.log(error);
    }
};
