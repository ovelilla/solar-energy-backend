import mongoose from "mongoose";
import Protection from "../models/Protection.js";

export const readProtections = async (req, res) => {
    try {
        const protections = await Protection.find();

        res.json(protections);
    } catch (error) {
        console.log(error);
    }
};

export const createProtection = async (req, res) => {
    const { description, protectionType, installationType, current, price } = req.body;

    const errors = {};

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!protectionType) {
        const error = new Error("El tipo de protección es obligatorio");
        errors.protectionType = error.message;
    } else if (protectionType !== "DC2" && protectionType !== "AC") {
        const error = new Error("El tipo de protección debe ser DC o AC");
        errors.protectionType = error.message;
    }

    if (!installationType) {
        const error = new Error("El tipo de instalación es obligatorio");
        errors.installationType = error.message;
    } else if (
        installationType !== "String" &&
        installationType !== "Microinversor" &&
        installationType !== "Todo"
    ) {
        const error = new Error("El tipo de instalación debe ser String o Microinversor");
        errors.installationType = error.message;
    }

    if (!current) {
        const error = new Error("La corriente es obligatoria");
        errors.current = error.message;
    } else if (current !== "Monofásico" && current !== "Trifásico" && current !== "Todo") {
        const error = new Error("La corriente debe ser Monofásico o Trifásico");
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

    const newProtection = new Protection(req.body);

    try {
        const savedProtection = await newProtection.save();

        res.json({ message: "Protección creada correctamente", protection: savedProtection });
    } catch (error) {
        console.log(error);
    }
};

export const updateProtection = async (req, res) => {
    const { id } = req.params;
    const { description, protectionType, installationType, current, price } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La protección no existe");
        return res.status(404).json({ message: error.message });
    }

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!protectionType) {
        const error = new Error("El tipo de protección es obligatorio");
        errors.protectionType = error.message;
    } else if (protectionType !== "DC2" && protectionType !== "AC") {
        const error = new Error("El tipo de protección debe ser DC o AC");
        errors.protectionType = error.message;
    }

    if (!installationType) {
        const error = new Error("El tipo de instalación es obligatorio");
        errors.installationType = error.message;
    } else if (
        installationType !== "String" &&
        installationType !== "Microinversor" &&
        installationType !== "Todo"
    ) {
        const error = new Error("El tipo de instalación debe ser String o Microinversor");
        errors.installationType = error.message;
    }

    if (!current) {
        const error = new Error("La corriente es obligatoria");
        errors.current = error.message;
    } else if (current !== "Monofásico" && current !== "Trifásico" && current !== "Todo") {
        const error = new Error("La corriente debe ser Monofásico o Trifásico");
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

    const foundProtection = await Protection.findById(id);

    if (!foundProtection) {
        const error = new Error("La protección no existe");
        return res.status(404).json({ message: error.message });
    }

    const updatedProtection = {
        description,
        protectionType,
        installationType,
        current,
        price,
        _id: id,
    };

    try {
        await Protection.findByIdAndUpdate(id, updatedProtection, { new: true });

        res.json({
            message: "Protección actualizada correctamente",
            protection: updatedProtection,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProtection = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La protección no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundProtection = await Protection.findById(id);

    if (!foundProtection) {
        const error = new Error("La protección no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Protection.findByIdAndRemove(id);

        res.json({ message: "Protección eliminada correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProtections = async (req, res) => {
    const { ids } = req.body;

    try {
        await Protection.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Protecciónes eliminadas correctamente" });
    } catch (error) {
        console.log(error);
    }
};
