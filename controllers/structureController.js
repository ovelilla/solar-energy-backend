import mongoose from "mongoose";
import Structure from "../models/Structure.js";

export const readStructures = async (req, res) => {
    try {
        const structures = await Structure.find();

        res.json(structures);
    } catch (error) {
        console.log(error);
    }
};

export const createStructure = async (req, res) => {
    const { description, type, price } = req.body;

    const errors = {};

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!type) {
        const error = new Error("El tipo de la estructura es obligatorio");
        errors.type = error.message;
    } else if (type !== "Coplanar" && type !== "Inclinada") {
        const error = new Error("El tipo de la estructura debe ser Coplanar o Inclinada");
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

    const newStructure = new Structure(req.body);

    try {
        const savedStructure = await newStructure.save();

        res.json({ message: "Estructura creada correctamente", structure: savedStructure });
    } catch (error) {
        console.log(error);
    }
};

export const updateStructure = async (req, res) => {
    const { id } = req.params;
    const { description, type, price } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La estructura no existe");
        return res.status(404).json({ message: error.message });
    }

    if (!description) {
        const error = new Error("La descripción es obligatoria");
        errors.description = error.message;
    }

    if (!type) {
        const error = new Error("El tipo de la estructura es obligatorio");
        errors.type = error.message;
    } else if (type !== "Coplanar" && type !== "Inclinada") {
        const error = new Error("El tipo de la estructura debe ser Coplanar o Inclinada");
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

    const foundStructure = await Structure.findById(id);

    if (!foundStructure) {
        const error = new Error("La estructura no existe");
        return res.status(404).json({ message: error.message });
    }

    const updatedStructure = {
        description,
        type,
        price,
        _id: id,
    };

    try {
        await Structure.findByIdAndUpdate(id, updatedStructure, { new: true });

        res.json({
            message: "Estructura actualizada correctamente",
            structure: updatedStructure,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteStructure = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La estructura no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundStructure = await Structure.findById(id);

    if (!foundStructure) {
        const error = new Error("La estructura no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Structure.findByIdAndRemove(id);

        res.json({ message: "Estructura eliminada correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteStructures = async (req, res) => {
    const { ids } = req.body;

    try {
        await Structure.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Estructuras eliminadas correctamente" });
    } catch (error) {
        console.log(error);
    }
};
