import mongoose from "mongoose";
import Peripheral from "../models/Peripheral.js";

export const readPeripherals = async (req, res) => {
    try {
        const peripherals = await Peripheral.find();

        res.json(peripherals);
    } catch (error) {
        console.log(error);
    }
};

export const createPeripheral = async (req, res) => {
    const { description, type, current, price, active } = req.body;

    const errors = {};

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!type) {
        const error = new Error("El tipo es obligatorio");
        errors.type = error.message;
    } else if (type !== "Todo" && type !== "String" && type !== "Microinversor") {
        const error = new Error("El tipo debe ser Todo, String o Microinversor");
        errors.type = error.message;
    }

    if (!current) {
        const error = new Error("La corriente es obligatoria");
        errors.current = error.message;
    } else if (current !== "Todo" && current !== "Monofásico" && current !== "Trifásico") {
        const error = new Error("La corriente debe ser Todo, Monofásico o Trifásico");
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

    const newPeripheral = new Peripheral(req.body);

    try {
        const savedPeripheral = await newPeripheral.save();

        res.json({ message: "Periférico creado correctamente", peripheral: savedPeripheral });
    } catch (error) {
        console.log(error);
    }
};

export const updatePeripheral = async (req, res) => {
    const { id } = req.params;
    const { description, type, current, price, active } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El periférico no existe");
        return res.status(404).json({ message: error.message });
    }

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!type) {
        const error = new Error("El tipo es obligatorio");
        errors.type = error.message;
    } else if (type !== "Todo" && type !== "String" && type !== "Microinversor") {
        const error = new Error("El tipo debe ser Todo, String o Microinversor");
        errors.type = error.message;
    }

    if (!current) {
        const error = new Error("La corriente es obligatoria");
        errors.current = error.message;
    } else if (current !== "Todo" && current !== "Monofásico" && current !== "Trifásico") {
        const error = new Error("La corriente debe ser Todo, Monofásico o Trifásico");
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

    const foundPeripheral = await Peripheral.findById(id);

    if (!foundPeripheral) {
        const error = new Error("El periférico no existe");
        return res.status(404).json({ message: error.message });
    }

    const updatedPeripheral = { description, type, current, price, active, _id: id };

    try {
        await Peripheral.findByIdAndUpdate(id, updatedPeripheral, { new: true });

        res.json({
            message: "Periférico actualizado correctamente",
            peripheral: updatedPeripheral,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateActive = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El periférico no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundPeripheral = await Peripheral.findById(id);

    if (!foundPeripheral) {
        const error = new Error("El periférico no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Peripheral.findByIdAndUpdate(id, { active: !foundPeripheral.active }, { new: true });

        const peripherals = await Peripheral.find();

        res.json({ message: "Periférico activado correctamente", peripherals });
    } catch (error) {
        console.log(error);
    }
};

export const deletePeripheral = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El periférico no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundPeripheral = await Peripheral.findById(id);

    if (!foundPeripheral) {
        const error = new Error("El periférico no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Peripheral.findByIdAndRemove(id);

        res.json({ message: "Periférico eliminado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deletePeripherals = async (req, res) => {
    const { ids } = req.body;

    try {
        await Peripheral.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Periféricos eliminados correctamente" });
    } catch (error) {
        console.log(error);
    }
};
