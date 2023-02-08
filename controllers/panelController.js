import mongoose from "mongoose";
import Panel from "../models/Panel.js";

export const readPanels = async (req, res) => {
    try {
        const panels = await Panel.find();

        res.json(panels);
    } catch (error) {
        console.log(error);
    }
};

export const createPanel = async (req, res) => {
    const { description, power, warranty, efficiency, price, active } = req.body;

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

    if (!warranty) {
        const error = new Error("La garantía es obligatoria");
        errors.warranty = error.message;
    } else if (isNaN(warranty)) {
        const error = new Error("La garantía debe ser un número");
        errors.warranty = error.message;
    }

    if (!efficiency) {
        const error = new Error("La eficiencia es obligatoria");
        errors.efficiency = error.message;
    } else if (isNaN(efficiency)) {
        const error = new Error("La eficiencia debe ser un número");
        errors.efficiency = error.message;
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

    const panelsCount = await Panel.countDocuments();

    const newPanel = new Panel({
        ...req.body,
        active: panelsCount === 0,
    });

    try {
        const savedPanel = await newPanel.save();

        res.json({ message: "Panel creado correctamente", panel: savedPanel });
    } catch (error) {
        console.log(error);
    }
};

export const updatePanel = async (req, res) => {
    const { id } = req.params;
    const { description, power, warranty, efficiency, price, active } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La panel no existe");
        errors.panel = error.message;
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

    if (!warranty) {
        const error = new Error("La garantía es obligatoria");
        errors.warranty = error.message;
    } else if (isNaN(warranty)) {
        const error = new Error("La garantía debe ser un número");
        errors.warranty = error.message;
    }

    if (!efficiency) {
        const error = new Error("La eficiencia es obligatoria");
        errors.efficiency = error.message;
    } else if (isNaN(efficiency)) {
        const error = new Error("La eficiencia debe ser un número");
        errors.efficiency = error.message;
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

    const foundPanel = await Panel.findById(id);

    if (!foundPanel) {
        const error = new Error("El panel no existe");
        return res.status(404).json({ message: error.message });
    }

    const updatedPanel = { description, power, warranty, efficiency, price, active, _id: id };

    try {
        await Panel.findByIdAndUpdate(id, updatedPanel, { new: true });

        res.json({
            message: "Panel actualizado correctamente",
            panel: updatedPanel,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateActive = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El panel no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundPanel = await Panel.findById(id);

    if (!foundPanel) {
        const error = new Error("El panel no existe");
        return res.status(404).json({ message: error.message });
    }

    if (foundPanel.active) {
        const error = new Error("El panel ya está activo");
        return res.status(400).json({ message: error.message });
    }

    try {
        await Panel.updateMany({ active: true }, { active: false });
        await Panel.findByIdAndUpdate(id, { active: true }, { new: true });

        const panels = await Panel.find();

        res.json({ message: "Panel activado correctamente", panels });
    } catch (error) {
        console.log(error);
    }
};

export const deletePanel = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El panel no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundPanel = await Panel.findById(id);

    if (!foundPanel) {
        const error = new Error("El panel no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Panel.findByIdAndRemove(id);

        res.json({ message: "Panel eliminado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deletePanels = async (req, res) => {
    const { ids } = req.body;

    try {
        await Panel.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Paneles eliminados correctamente" });
    } catch (error) {
        console.log(error);
    }
};
