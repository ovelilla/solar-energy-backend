import mongoose from "mongoose";
import Predefined from "../models/Predefined.js";

export const readPredefined = async (req, res) => {
    try {
        const predefined = await Predefined.findOne();

        res.json(predefined);
    } catch (error) {
        console.log(error);
    }
};

export const createPredefined = async (req, res) => {
    const {
        lastInvoiceEnergyCost,
        kWhConsumedLastBill,
        monthlyEnergyConsumption,
        contractedPowerInKW,
        avgPriceKWContractedPowerAnnual,
        ivaRate,
        estimatedCoverage,
        roofOrientation,
        panelSlope,
        structureType,
        installationType,
        current,
        potentialRadiationPerkWYear,
        systemLoss,
        consumptionHabit,
        battery,
    } = req.body;

    const errors = {};

    if (!lastInvoiceEnergyCost) {
        const error = new Error("El coste de la última factura en euros es obligatorio");
        errors.lastInvoiceEnergyCost = error.message;
    } else if (isNaN(lastInvoiceEnergyCost)) {
        const error = new Error("El coste de la última factura debe ser un número");
        errors.lastInvoiceEnergyCost = error.message;
    }

    if (!kWhConsumedLastBill) {
        const error = new Error("El consumo en kWh de la última factura es obligatorio");
        errors.kWhConsumedLastBill = error.message;
    } else if (isNaN(kWhConsumedLastBill)) {
        const error = new Error("El consumo en kWh de la última factura debe ser un número");
        errors.kWhConsumedLastBill = error.message;
    }

    if (!monthlyEnergyConsumption) {
        const error = new Error("El consumo mensual en kWh es obligatorio");
        errors.monthlyEnergyConsumption = error.message;
    } else if (isNaN(monthlyEnergyConsumption)) {
        const error = new Error("El consumo mensual en kWh debe ser un número");
        errors.monthlyEnergyConsumption = error.message;
    }

    if (!contractedPowerInKW) {
        const error = new Error("La potencia contratada en kW es obligatoria");
        errors.contractedPowerInKW = error.message;
    } else if (isNaN(contractedPowerInKW)) {
        const error = new Error("La potencia contratada en kW debe ser un número");
        errors.contractedPowerInKW = error.message;
    }

    if (!avgPriceKWContractedPowerAnnual) {
        const error = new Error(
            "El precio medio por kW de potencia contratada anual es obligatorio"
        );
        errors.avgPriceKWContractedPowerAnnual = error.message;
    } else if (isNaN(avgPriceKWContractedPowerAnnual)) {
        const error = new Error(
            "El precio medio por kW de potencia contratada anual debe ser un número"
        );
        errors.avgPriceKWContractedPowerAnnual = error.message;
    }

    if (!ivaRate) {
        const error = new Error("El tipo de IVA es obligatorio");
        errors.ivaRate = error.message;
    } else if (isNaN(ivaRate)) {
        const error = new Error("El tipo de IVA debe ser un número");
        errors.ivaRate = error.message;
    }

    if (!estimatedCoverage) {
        const error = new Error("La cobertura estimada es obligatoria");
        errors.estimatedCoverage = error.message;
    } else if (isNaN(estimatedCoverage)) {
        const error = new Error("La cobertura estimada debe ser un número");
        errors.estimatedCoverage = error.message;
    }

    if (!roofOrientation) {
        const error = new Error("La orientación de la cubierta es obligatoria");
        errors.roofOrientation = error.message;
    }

    if (!panelSlope) {
        const error = new Error("La inclinación es obligatoria");
        errors.panelSlope = error.message;
    } else if (isNaN(panelSlope)) {
        const error = new Error("La inclinación debe ser un número");
        errors.panelSlope = error.message;
    }

    if (!structureType) {
        const error = new Error("El tipo de estructura es obligatorio");
        errors.structureType = error.message;
    } else if (structureType !== "Coplanar" && structureType !== "Inclinada") {
        const error = new Error("El tipo de estructura debe ser Coplanar o Inclinada");
        errors.structureType = error.message;
    }

    if (!installationType) {
        const error = new Error("El tipo de instalación es obligatorio");
        errors.installationType = error.message;
    }

    if (!current) {
        const error = new Error("La corriente es obligatoria");
        errors.current = error.message;
    } else if (current !== "Monofásico" && current !== "Trifásico") {
        const error = new Error("La corriente debe ser Monofásico o Trifásico");
        errors.current = error.message;
    }

    if (!potentialRadiationPerkWYear) {
        const error = new Error("La radiación potencial por kW anual es obligatoria");
        errors.potentialRadiationPerkWYear = error.message;
    } else if (isNaN(potentialRadiationPerkWYear)) {
        const error = new Error("La radiación potencial por kW anual debe ser un número");
        errors.potentialRadiationPerkWYear = error.message;
    }

    if (!systemLoss) {
        const error = new Error("La pérdida del sistema es obligatoria");
        errors.systemLoss = error.message;
    } else if (isNaN(systemLoss)) {
        const error = new Error("La pérdida del sistema debe ser un número");
        errors.systemLoss = error.message;
    }

    if (!consumptionHabit) {
        const error = new Error("El hábito de consumo es obligatorio");
        errors.consumptionHabit = error.message;
    }

    if (battery === "") {
        const error = new Error("La batería es obligatoria");
        errors.battery = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const newPredefined = new Predefined(req.body);

    try {
        const savedPredefined = await newPredefined.save();

        res.json({
            message: "Datos predefinidos creados correctamente",
            predefined: savedPredefined,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updatePredefined = async (req, res) => {
    const { id } = req.params;
    const {
        lastInvoiceEnergyCost,
        kWhConsumedLastBill,
        monthlyEnergyConsumption,
        contractedPowerInKW,
        avgPriceKWContractedPowerAnnual,
        ivaRate,
        estimatedCoverage,
        roofOrientation,
        panelSlope,
        structureType,
        installationType,
        current,
        potentialRadiationPerkWYear,
        systemLoss,
        consumptionHabit,
        battery,
    } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Los datos predefinidos no existen");
        return res.status(404).json({ message: error.message });
    }

    if (!lastInvoiceEnergyCost) {
        const error = new Error("El coste de la última factura en euros es obligatorio");
        errors.lastInvoiceEnergyCost = error.message;
    } else if (isNaN(lastInvoiceEnergyCost)) {
        const error = new Error("El coste de la última factura debe ser un número");
        errors.lastInvoiceEnergyCost = error.message;
    }

    if (!kWhConsumedLastBill) {
        const error = new Error("El consumo en kWh de la última factura es obligatorio");
        errors.kWhConsumedLastBill = error.message;
    } else if (isNaN(kWhConsumedLastBill)) {
        const error = new Error("El consumo en kWh de la última factura debe ser un número");
        errors.kWhConsumedLastBill = error.message;
    }

    if (!monthlyEnergyConsumption) {
        const error = new Error("El consumo mensual en kWh es obligatorio");
        errors.monthlyEnergyConsumption = error.message;
    } else if (isNaN(monthlyEnergyConsumption)) {
        const error = new Error("El consumo mensual en kWh debe ser un número");
        errors.monthlyEnergyConsumption = error.message;
    }

    if (!contractedPowerInKW) {
        const error = new Error("La potencia contratada en kW es obligatoria");
        errors.contractedPowerInKW = error.message;
    } else if (isNaN(contractedPowerInKW)) {
        const error = new Error("La potencia contratada en kW debe ser un número");
        errors.contractedPowerInKW = error.message;
    }

    if (!avgPriceKWContractedPowerAnnual) {
        const error = new Error(
            "El precio medio por kW de potencia contratada anual es obligatorio"
        );
        errors.avgPriceKWContractedPowerAnnual = error.message;
    } else if (isNaN(avgPriceKWContractedPowerAnnual)) {
        const error = new Error(
            "El precio medio por kW de potencia contratada anual debe ser un número"
        );
        errors.avgPriceKWContractedPowerAnnual = error.message;
    }

    if (!ivaRate) {
        const error = new Error("El tipo de IVA es obligatorio");
        errors.ivaRate = error.message;
    } else if (isNaN(ivaRate)) {
        const error = new Error("El tipo de IVA debe ser un número");
        errors.ivaRate = error.message;
    }

    if (!estimatedCoverage) {
        const error = new Error("La cobertura estimada es obligatoria");
        errors.estimatedCoverage = error.message;
    } else if (isNaN(estimatedCoverage)) {
        const error = new Error("La cobertura estimada debe ser un número");
        errors.estimatedCoverage = error.message;
    }

    if (!roofOrientation) {
        const error = new Error("La orientación de la cubierta es obligatoria");
        errors.roofOrientation = error.message;
    }

    if (!panelSlope) {
        const error = new Error("La inclinación es obligatoria");
        errors.panelSlope = error.message;
    } else if (isNaN(panelSlope)) {
        const error = new Error("La inclinación debe ser un número");
        errors.panelSlope = error.message;
    }

    if (!structureType) {
        const error = new Error("El tipo de estructura es obligatorio");
        errors.structureType = error.message;
    } else if (structureType !== "Coplanar" && structureType !== "Inclinada") {
        const error = new Error("El tipo de estructura debe ser Coplanar o Inclinada");
        errors.structureType = error.message;
    }

    if (!installationType) {
        const error = new Error("El tipo de instalación es obligatorio");
        errors.installationType = error.message;
    }

    if (!current) {
        const error = new Error("La corriente es obligatoria");
        errors.current = error.message;
    } else if (current !== "Monofásico" && current !== "Trifásico") {
        const error = new Error("La corriente debe ser Monofásico o Trifásico");
        errors.current = error.message;
    }

    if (!potentialRadiationPerkWYear) {
        const error = new Error("La radiación potencial por kW anual es obligatoria");
        errors.potentialRadiationPerkWYear = error.message;
    } else if (isNaN(potentialRadiationPerkWYear)) {
        const error = new Error("La radiación potencial por kW anual debe ser un número");
        errors.potentialRadiationPerkWYear = error.message;
    }

    if (!systemLoss) {
        const error = new Error("La pérdida del sistema es obligatoria");
        errors.systemLoss = error.message;
    } else if (isNaN(systemLoss)) {
        const error = new Error("La pérdida del sistema debe ser un número");
        errors.systemLoss = error.message;
    }

    if (!consumptionHabit) {
        const error = new Error("El hábito de consumo es obligatorio");
        errors.consumptionHabit = error.message;
    }

    if (battery === "") {
        const error = new Error("La batería es obligatoria");
        errors.battery = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const foundPredefined = await Predefined.findById(id);

    if (!foundPredefined) {
        const error = new Error("Los datos predefinidos no existen");
        return res.status(404).json({ message: error.message });
    }

    const updatedPredefined = {
        lastInvoiceEnergyCost,
        kWhConsumedLastBill,
        monthlyEnergyConsumption,
        contractedPowerInKW,
        avgPriceKWContractedPowerAnnual,
        ivaRate,
        estimatedCoverage,
        roofOrientation,
        panelSlope,
        structureType,
        installationType,
        current,
        potentialRadiationPerkWYear,
        systemLoss,
        consumptionHabit,
        battery,
        _id: id,
    };

    try {
        const dbPredefined = await Predefined.findByIdAndUpdate(id, updatedPredefined, {
            new: true,
        });

        res.json({
            message: "Datos predefinidos actualizados correctamente",
            predefined: dbPredefined,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deletePredefined = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Los datos predefinidos no existen");
        return res.status(404).json({ message: error.message });
    }

    const foundPredefined = await Predefined.findById(id);

    if (!foundPredefined) {
        const error = new Error("Los datos predefinidos no existen");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Predefined.findByIdAndRemove(id);

        res.json({ message: "Datos predefinidos eliminados correctamente" });
    } catch (error) {
        console.log(error);
    }
};
