import mongoose from "mongoose";
import FixedCosts from "../models/FixedCosts.js";

export const readFixedCosts = async (req, res) => {
    try {
        const fixedCosts = await FixedCosts.findOne();

        res.json(fixedCosts);
    } catch (error) {
        console.log(error);
    }
};

export const createFixedCosts = async (req, res) => {
    const {
        PMCost,
        transports,
        legalization,
        fees,
        technicalVisit,
        acquisitionCosts,
        operatingCosts,
        maintenanceCost,
        index,
        netPrice,
        ivaRate,
    } = req.body;

    const errors = {};

    if (!PMCost) {
        const error = new Error("El coste de PM es obligatorio");
        errors.PMCost = error.message;
    } else if (isNaN(PMCost)) {
        const error = new Error("El coste de PM debe ser un número");
        errors.PMCost = error.message;
    }

    if (!transports) {
        const error = new Error("Los costes transporte son obligatorios");
        errors.transports = error.message;
    } else if (isNaN(transports)) {
        const error = new Error("Los costes de transporte deben ser un número");
        errors.transports = error.message;
    }

    if (!legalization) {
        const error = new Error("Los costes de legalización son obligatorios");
        errors.legalization = error.message;
    } else if (isNaN(legalization)) {
        const error = new Error("Los costes de legalización deben ser un número");
        errors.legalization = error.message;
    }

    if (!fees) {
        const error = new Error("Las tasas son obligatorias");
        errors.fees = error.message;
    } else if (isNaN(fees)) {
        const error = new Error("Las tasas deben ser un número");
        errors.fees = error.message;
    }

    if (!technicalVisit) {
        const error = new Error("Los costes de la visita técnica son obligatorios");
        errors.technicalVisit = error.message;
    } else if (isNaN(technicalVisit)) {
        const error = new Error("Los costes de la visita técnica deben ser un número");
        errors.technicalVisit = error.message;
    }

    if (!acquisitionCosts) {
        const error = new Error("Los costes de captación son obligatorios");
        errors.acquisitionCosts = error.message;
    } else if (isNaN(acquisitionCosts)) {
        const error = new Error("Los costes de captación deben ser un número");
        errors.acquisitionCosts = error.message;
    }

    if (!operatingCosts) {
        const error = new Error("Los costes de operaciones son obligatorios");
        errors.operatingCosts = error.message;
    } else if (isNaN(operatingCosts)) {
        const error = new Error("Los costes de operaciones deben ser un número");
        errors.operatingCosts = error.message;
    }

    if (!maintenanceCost) {
        const error = new Error("Los costes de mantenimiento son obligatorios");
        errors.maintenanceCost = error.message;
    } else if (isNaN(maintenanceCost)) {
        const error = new Error("Los costes de mantenimiento deben ser un número");
        errors.maintenanceCost = error.message;
    }

    if (!index) {
        const error = new Error("El index es obligatorio");
        errors.index = error.message;
    } else if (isNaN(index)) {
        const error = new Error("El index debe ser un número");
        errors.index = error.message;
    }

    if (!netPrice) {
        const error = new Error("El precio neto es obligatorio");
        errors.netPrice = error.message;
    } else if (isNaN(netPrice)) {
        const error = new Error("El precio neto debe ser un número");
        errors.netPrice = error.message;
    }

    if (!ivaRate) {
        const error = new Error("El tipo de IVA es obligatorio");
        errors.ivaRate = error.message;
    } else if (isNaN(ivaRate)) {
        const error = new Error("El tipo de IVA debe ser un número");
        errors.ivaRate = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const newFixedCosts = new FixedCosts(req.body);

    try {
        const savedFixedCosts = await newFixedCosts.save();

        res.json({
            message: "Gastos fijos creados correctamente",
            fixedCosts: savedFixedCosts,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateFixedCosts = async (req, res) => {
    const { id } = req.params;
    const {
        PMCost,
        transports,
        legalization,
        fees,
        technicalVisit,
        acquisitionCosts,
        operatingCosts,
        maintenanceCost,
        index,
        netPrice,
        ivaRate,
    } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Los gastos fijos no existen");
        return res.status(404).json({ message: error.message });
    }

    if (!PMCost) {
        const error = new Error("El coste de PM es obligatorio");
        errors.PMCost = error.message;
    } else if (isNaN(PMCost)) {
        const error = new Error("El coste de PM debe ser un número");
        errors.PMCost = error.message;
    }

    if (!transports) {
        const error = new Error("Los costes transporte son obligatorios");
        errors.transports = error.message;
    } else if (isNaN(transports)) {
        const error = new Error("Los costes de transporte deben ser un número");
        errors.transports = error.message;
    }

    if (!legalization) {
        const error = new Error("Los costes de legalización son obligatorios");
        errors.legalization = error.message;
    } else if (isNaN(legalization)) {
        const error = new Error("Los costes de legalización deben ser un número");
        errors.legalization = error.message;
    }

    if (!fees) {
        const error = new Error("Las tasas son obligatorias");
        errors.fees = error.message;
    } else if (isNaN(fees)) {
        const error = new Error("Las tasas deben ser un número");
        errors.fees = error.message;
    }

    if (!technicalVisit) {
        const error = new Error("Los costes de la visita técnica son obligatorios");
        errors.technicalVisit = error.message;
    } else if (isNaN(technicalVisit)) {
        const error = new Error("Los costes de la visita técnica deben ser un número");
        errors.technicalVisit = error.message;
    }

    if (!acquisitionCosts) {
        const error = new Error("Los costes de captación son obligatorios");
        errors.acquisitionCosts = error.message;
    } else if (isNaN(acquisitionCosts)) {
        const error = new Error("Los costes de captación deben ser un número");
        errors.acquisitionCosts = error.message;
    }

    if (!operatingCosts) {
        const error = new Error("Los costes de operaciones son obligatorios");
        errors.operatingCosts = error.message;
    } else if (isNaN(operatingCosts)) {
        const error = new Error("Los costes de operaciones deben ser un número");
        errors.operatingCosts = error.message;
    }

    if (!maintenanceCost) {
        const error = new Error("Los costes de mantenimiento son obligatorios");
        errors.maintenanceCost = error.message;
    } else if (isNaN(maintenanceCost)) {
        const error = new Error("Los costes de mantenimiento deben ser un número");
        errors.maintenanceCost = error.message;
    }

    if (!index) {
        const error = new Error("El index es obligatorio");
        errors.index = error.message;
    } else if (isNaN(index)) {
        const error = new Error("El index debe ser un número");
        errors.index = error.message;
    }

    if (!netPrice) {
        const error = new Error("El precio neto es obligatorio");
        errors.netPrice = error.message;
    } else if (isNaN(netPrice)) {
        const error = new Error("El precio neto debe ser un número");
        errors.netPrice = error.message;
    }

    if (!ivaRate) {
        const error = new Error("El tipo de IVA es obligatorio");
        errors.ivaRate = error.message;
    } else if (isNaN(ivaRate)) {
        const error = new Error("El tipo de IVA debe ser un número");
        errors.ivaRate = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const foundFixedCosts = await FixedCosts.findById(id);

    if (!foundFixedCosts) {
        const error = new Error("Los gastos fijos no existen");
        return res.status(404).json({ message: error.message });
    }

    const updatedFixedCosts = {
        PMCost,
        transports,
        legalization,
        fees,
        technicalVisit,
        acquisitionCosts,
        operatingCosts,
        maintenanceCost,
        index,
        netPrice,
        ivaRate,
        _id: id,
    };

    try {
        const dbFixedCosts = await FixedCosts.findByIdAndUpdate(id, updatedFixedCosts, {
            new: true,
        });

        res.json({
            message: "Gastos fijos actualizados correctamente",
            fixedCosts: dbFixedCosts,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteFixedCosts = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Los gastos fijos no existen");
        return res.status(404).json({ message: error.message });
    }

    const foundFixedCosts = await FixedCosts.findById(id);

    if (!foundFixedCosts) {
        const error = new Error("Los gastos fijos no existen");
        return res.status(404).json({ message: error.message });
    }

    try {
        await FixedCosts.findByIdAndRemove(id);

        res.json({ message: "Gastos fijos eliminados correctamente" });
    } catch (error) {
        console.log(error);
    }
};
