import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import requestIp from "request-ip";
import Proposal from "../models/Proposal.js";
import Panel from "../models/Panel.js";
import Habit from "../models/Habit.js";
import Contact from "../models/Contact.js";
import Event from "../models/Event.js";
import { getRate } from "./rateController.js";

export const readProposal = async (req, res) => {
    const { id } = req.params;
    try {
        const proposal = await Proposal.findById(id);

        res.json(proposal);
    } catch (error) {
        console.log(error);
    }
};

export const readProposalUuid = async (req, res) => {
    const { uuid } = req.params;
    try {
        const proposal = await Proposal.findOne({ uuid });

        res.json(proposal);
    } catch (error) {
        console.log(error);
    }
};

export const readProposals = async (req, res) => {
    try {
        const proposals = await Proposal.find().sort({ createdAt: -1 });

        res.json(proposals);
    } catch (error) {
        console.log(error);
    }
};

export const createProposal = async (req, res) => {
    const {
        address: { placeId },
    } = req.body;

    const errors = {};

    if (!placeId) {
        const error = new Error("El placeId es obligatorio");
        errors.placeId = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const clientIp = requestIp.getClientIp(req);
    req.body.clientIp = clientIp;

    const uuid = uuidv4();
    req.body.uuid = uuid;

    const proposal = new Proposal(req.body);

    try {
        const savedProposal = await proposal.save();

        res.json(savedProposal);
    } catch (error) {
        console.log(error);
    }
};

export const updateProposal = async (req, res) => {
    const { id } = req.params;
    const { proposal } = req.body;

    try {
        const currentProposal = await Proposal.findById(id);

        if (!currentProposal) {
            const error = new Error("La propuesta no existe");
            return res.status(404).json({ message: error.message });
        }

        proposal.counter = currentProposal.counter + 1;

        const updatedProposal = await Proposal.findByIdAndUpdate(id, proposal, { new: true });

        res.json(updatedProposal);
    } catch (error) {
        console.log(error);
    }
};

export const requestProposal = async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, phone, date } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("La propuesta no existe");
        return res.status(404).json({ message: error.message });
    }

    const errors = {};

    if (!name) {
        const error = new Error("El nombre es obligatorio");
        errors.name = error.message;
    }

    if (!surname) {
        const error = new Error("Los apellidos son obligatorios");
        errors.surname = error.message;
    }

    if (!email) {
        const error = new Error("El email es obligatorio");
        errors.email = error.message;
    }

    if (!phone) {
        const error = new Error("El teléfono es obligatorio");
        errors.phone = error.message;
    }

    const foundProposal = await Proposal.findById(id);

    if (!foundProposal) {
        const error = new Error("La propuesta no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundContact = await Contact.findOne({ email });

    try {
        if (!foundContact) {
            const contact = new Contact({ name, surname, email, phone, date });
            const savedContact = await contact.save();

            foundProposal.contact = savedContact._id;
        } else {
            foundProposal.contact = foundContact._id;
        }

        foundProposal.status = "request";

        const updatedProposal = await foundProposal.save();

        const event = new Event({
            title: "Solicitud de propuesta",
            description: `Solicitud de propuesta para ${name} ${surname}`,
            start: date,
            end: date,
            allDay: false,
            labelId: "64087a14f2718ffb83c90580",
        });
        const savedEvent = await event.save();

        res.json({
            message: "Propuesta solicitada correctamente",
            proposal: updatedProposal,
            event: savedEvent,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al transformar la propuesta" });
    }
};

export const calculateProposal = async (req, res) => {
    const { proposal } = req.body;

    const [panels, habits] = await Promise.all([Panel.find(), Habit.find()]);

    const { consumption, installation, pvgis } = proposal;
    const {
        lastInvoiceEnergyCost,
        kWhConsumedLastBill,
        monthlyEnergyConsumption,
        contractedPowerInKW,
        avgPriceKWContractedPowerAnnual,
        ivaRate,
    } = consumption;
    const {
        estimatedCoverage,
        roofOrientation,
        installationType,
        current,
        structureType,
        potentialRadiationPerkWYear,
        consumptionHabit,
        battery,
    } = installation;
    const { monthly, totals } = pvgis;

    const euroPerKwhInvoice = lastInvoiceEnergyCost / kWhConsumedLastBill;
    const anualConsumption = monthlyEnergyConsumption * 12;
    const anualCost = anualConsumption * euroPerKwhInvoice;
    const taxabelIncome = anualCost / (1 + ivaRate / 100);
    const fixedCost = contractedPowerInKW * avgPriceKWContractedPowerAnnual;
    const variableCost = taxabelIncome - fixedCost;
    const euroPerKwhNet = variableCost / anualConsumption;
    const euroPerKwhNetWithIva = euroPerKwhNet * (1 + ivaRate / 100);

    const energyPurchasePriceEuros = euroPerKwhNetWithIva;
    const averageMonthlyConsumptionEuros = monthlyEnergyConsumption * euroPerKwhInvoice;
    const annualConsumptionEuros = averageMonthlyConsumptionEuros * 12;

    const customerConsumptionResult = monthlyEnergyConsumption * 12;
    const requiredGenerationCapacity = customerConsumptionResult * (estimatedCoverage / 100);

    const habit = habits.find((habit) => {
        return habit.battery === battery && habit.habit === consumptionHabit;
    });
    const estimatedSelfConsumption = habit.selfConsumption;

    const realGenerationCapacity = (requiredGenerationCapacity * estimatedSelfConsumption) / 100;
    const generationCapacityPerPotentialRadiation = requiredGenerationCapacity / totals.E_y;

    const panel = panels.find((panel) => panel.active);
    const estimatedModules = Math.round(
        (generationCapacityPerPotentialRadiation * 1000) / panel.power
    );

    const installationPower = estimatedModules * panel.power;
    const installationPowerKw = installationPower / 1000;
    const installationProductionKwhYear = installationPowerKw * totals.E_y;

    const selfConsumedKwhYear = installationProductionKwhYear * (estimatedSelfConsumption / 100);
    const kWhValueSelfConsumed = energyPurchasePriceEuros;
    const savingsSelfConsumed = selfConsumedKwhYear * kWhValueSelfConsumed;

    const kWhSentToGrid = installationProductionKwhYear - selfConsumedKwhYear;
    const kWhValueSentToGrid = energyPurchasePriceEuros * 0.5;
    const savingsSentToGrid = kWhSentToGrid * kWhValueSentToGrid;

    const yearlySavings = savingsSelfConsumed + savingsSentToGrid;
    const monthlySavings = yearlySavings / 12;
    const savings25Years = yearlySavings * 25;

    const billingWithoutSolar = annualConsumptionEuros;
    const billingWithSolar = annualConsumptionEuros - yearlySavings;

    const reductionPercentage = (yearlySavings / billingWithoutSolar) * 100;

    const customReq = {
        body: {
            modules: estimatedModules,
            installationType: installationType,
            current: current,
            structureType: structureType,
            panelId: panel._id,
            batteryId: "",
        },
    };

    const rate = await getRate(customReq);

    const proposalResult = {
        comparativeBreakdown: {
            euroPerKwhInvoice,
            anualConsumption,
            anualCost,
            taxabelIncome,
            fixedCost,
            variableCost,
            euroPerKwhNet,
            euroPerKwhNetWithIva,
        },
        dataExtraction: {
            lastInvoiceEnergyCost,
            kWhConsumedLastBill,
            monthlyEnergyConsumption,
            contractedPowerInKW,
            avgPriceKWContractedPowerAnnual,
            ivaRate,
            energyPurchasePriceEuros,
            averageMonthlyConsumptionEuros,
            annualConsumptionEuros,
        },
        customerNeeds: {
            customerConsumptionResult,
            estimatedCoverage,
            requiredGenerationCapacity,
        },
        installationParameters: {
            roofOrientation,
            installationType,
            current,
            structureType,
            potentialRadiationPerkWYear,
            consumptionHabit,
            battery,
            estimatedSelfConsumption,
        },
        installationSizing: {
            realGenerationCapacity,
            generationCapacityPerPotentialRadiation,
            estimatedModules,
            installationPower,
            installationPowerKw,
            installationProductionKwhYear,
        },
        savings: {
            monthly: monthlySavings,
            yearly: yearlySavings,
            years25: savings25Years,
            breakdown: {
                selfConsumtion: {
                    selfConsumedKwhYear,
                    kWhValueSelfConsumed,
                    savingsSelfConsumed,
                },
                sentToGrid: {
                    kWhSentToGrid,
                    kWhValueSentToGrid,
                    savingsSentToGrid,
                },
            },
            billingWithoutSolar,
            billingWithSolar,
            reductionPercentage,
        },
        rate,
    };

    res.status(200).json(proposalResult);
};
