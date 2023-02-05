import mongoose from "mongoose";
import Battery from "../models/Battery.js";

export const readBatteries = async (req, res) => {
    try {
        const batteries = await Battery.find();

        res.json(batteries);
    } catch (error) {
        console.log(error);
    }
};

export const createBattery = async (req, res) => {
    const { capacity, description, modules, price } = req.body;

    const errors = {};

    if (!capacity) {
        const error = new Error("La capacidad es obligatoria");
        errors.capacity = error.message;
    } else if (isNaN(capacity)) {
        const error = new Error("La capacidad debe ser un número");
        errors.capacity = error.message;
    }

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!modules) {
        const error = new Error("Los modulos son obligatorios");
        errors.modules = error.message;
    } else if (isNaN(modules)) {
        const error = new Error("Los modulos deben ser un número");
        errors.modules = error.message;
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

    const newBattery = new Battery(req.body);

    try {
        const savedBattery = await newBattery.save();

        res.json({ message: "Batería creada correctamente", battery: savedBattery });
    } catch (error) {
        console.log(error);
    }
};

export const updateBattery = async (req, res) => {
    const { id } = req.params;
    const { capacity, description, modules, price } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La batería no existe");
        errors.battery = error.message;
    }

    if (!capacity) {
        const error = new Error("La capacidad es obligatoria");
        errors.capacity = error.message;
    } else if (isNaN(capacity)) {
        const error = new Error("La capacidad debe ser un número");
        errors.capacity = error.message;
    }

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!modules) {
        const error = new Error("Los modulos son obligatorios");
        errors.modules = error.message;
    } else if (isNaN(modules)) {
        const error = new Error("Los modulos deben ser un número");
        errors.modules = error.message;
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

    const foundBattery = await Battery.findById(id);

    if (!foundBattery) {
        const error = new Error("La batería no existe");
        return res.status(404).json({ message: error.message });
    }

    const updatedBattery = { capacity, description, modules, price, _id: id };

    try {
        await Battery.findByIdAndUpdate(id, updatedBattery, { new: true });

        res.json({
            message: "Batería actualizada correctamente",
            battery: updatedBattery,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteBattery = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La batería no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundBattery = await Battery.findById(id);

    if (!foundBattery) {
        const error = new Error("La batería no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Battery.findByIdAndRemove(id);

        res.json({ message: "Batería eliminada correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteBatteries = async (req, res) => {
    const { ids } = req.body;

    try {
        await Battery.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Baterías eliminadas correctamente" });
    } catch (error) {
        console.log(error);
    }
};
