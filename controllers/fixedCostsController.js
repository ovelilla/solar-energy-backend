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
        additionalString,
        PMCost,
        transports,
        legalization,
        fees,
        technicalVisit,
        acquisitionCosts,
        operatingCosts,
        maintenanceCost,
        index,
        profitability,
        ivaInstallation,
        ivaBatteries,
        variousUnit,
        variousPower,
        variousModules,
    } = req.body;

    const errors = {};

    if (!additionalString) {
        const error = new Error("El coste de string adicional es obligatorio");
        errors.additionalString = error.message;
    } else if (isNaN(additionalString)) {
        const error = new Error("El coste de string adicional debe ser un número");
        errors.additionalString = error.message;
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

    if (!profitability) {
        const error = new Error("La rentabilidad es obligatoria");
        errors.profitability = error.message;
    } else if (isNaN(profitability)) {
        const error = new Error("La rentabilidad debe ser un número");
        errors.profitability = error.message;
    }

    if (!ivaInstallation) {
        const error = new Error("El IVA de instalación es obligatorio");
        errors.ivaInstallation = error.message;
    } else if (isNaN(ivaInstallation)) {
        const error = new Error("El IVA de instalación debe ser un número");
        errors.ivaInstallation = error.message;
    }

    if (!ivaBatteries) {
        const error = new Error("El IVA de baterías es obligatorio");
        errors.ivaBatteries = error.message;
    } else if (isNaN(ivaBatteries)) {
        const error = new Error("El IVA de baterías debe ser un número");
        errors.ivaBatteries = error.message;
    }

    if (variousUnit === "") {
        const error = new Error("Los varios unitarios son obligatorios");
        errors.variousUnit = error.message;
    } else if (isNaN(variousUnit)) {
        const error = new Error("Los varios unitarios deben ser un número");
        errors.variousUnit = error.message;
    }

    if (variousPower === "") {
        const error = new Error("Los varios por potencia total son obligatorios");
        errors.variousPower = error.message;
    } else if (isNaN(variousPower)) {
        const error = new Error("Los varios por potencia total deben ser un número");
        errors.variousPower = error.message;
    }

    if (variousModules === "") {
        const error = new Error("Los varios por módulo son obligatorios");
        errors.variousModules = error.message;
    } else if (isNaN(variousModules)) {
        const error = new Error("Los varios por módulo deben ser un número");
        errors.variousModules = error.message;
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
        additionalString,
        PMCost,
        transports,
        legalization,
        fees,
        technicalVisit,
        acquisitionCosts,
        operatingCosts,
        maintenanceCost,
        index,
        profitability,
        ivaInstallation,
        ivaBatteries,
        variousUnit,
        variousPower,
        variousModules,
    } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Los gastos fijos no existen");
        return res.status(404).json({ message: error.message });
    }

    if (!additionalString) {
        const error = new Error("El coste de string adicional es obligatorio");
        errors.additionalString = error.message;
    } else if (isNaN(additionalString)) {
        const error = new Error("El coste de string adicional debe ser un número");
        errors.additionalString = error.message;
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

    if (!profitability) {
        const error = new Error("La rentabilidad es obligatoria");
        errors.profitability = error.message;
    } else if (isNaN(profitability)) {
        const error = new Error("La rentabilidad debe ser un número");
        errors.profitability = error.message;
    }

    if (!ivaInstallation) {
        const error = new Error("El IVA de instalación es obligatorio");
        errors.ivaInstallation = error.message;
    } else if (isNaN(ivaInstallation)) {
        const error = new Error("El IVA de instalación debe ser un número");
        errors.ivaInstallation = error.message;
    }

    if (!ivaBatteries) {
        const error = new Error("El IVA de baterías es obligatorio");
        errors.ivaBatteries = error.message;
    } else if (isNaN(ivaBatteries)) {
        const error = new Error("El IVA de baterías debe ser un número");
        errors.ivaBatteries = error.message;
    }

    if (variousUnit === "") {
        const error = new Error("Los varios unitarios son obligatorios");
        errors.variousUnit = error.message;
    } else if (isNaN(variousUnit)) {
        const error = new Error("Los varios unitarios deben ser un número");
        errors.variousUnit = error.message;
    }

    if (variousPower === "") {
        const error = new Error("Los varios por potencia total son obligatorios");
        errors.variousPower = error.message;
    } else if (isNaN(variousPower)) {
        const error = new Error("Los varios por potencia total deben ser un número");
        errors.variousPower = error.message;
    }

    if (variousModules === "") {
        const error = new Error("Los varios por módulo son obligatorios");
        errors.variousModules = error.message;
    } else if (isNaN(variousModules)) {
        const error = new Error("Los varios por módulo deben ser un número");
        errors.variousModules = error.message;
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
        additionalString,
        PMCost,
        transports,
        legalization,
        fees,
        technicalVisit,
        acquisitionCosts,
        operatingCosts,
        maintenanceCost,
        index,
        profitability,
        ivaInstallation,
        ivaBatteries,
        variousUnit,
        variousPower,
        variousModules,
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
