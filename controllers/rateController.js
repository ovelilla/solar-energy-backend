import mongoose from "mongoose";
import Panel from "../models/Panel.js";
import Inverter from "../models/Inverter.js";
import Microinverter from "../models/Microinverter.js";
import Meter from "../models/Meter.js";
import Structure from "../models/Structure.js";
import Peripheral from "../models/Peripheral.js";
import Line from "../models/Line.js";
import Protection from "../models/Protection.js";
import FixedCosts from "../models/FixedCosts.js";

export const getRate = async (req, res) => {
    const { modules, installationType, current, structureType, panelId } = req.body;

    const errors = {};

    if (!modules) {
        const error = new Error("Por favor, ingrese el número de módulos");
        errors.modules = error.message;
    } else if (isNaN(modules)) {
        const error = new Error("El número de módulos debe ser un número");
        errors.modules = error.message;
    }

    if (!installationType) {
        const error = new Error("Por favor, seleccione el tipo de instalación");
        errors.installationType = error.message;
    }

    if (!current) {
        const error = new Error("Por favor, seleccione el tipo de corriente");
        errors.current = error.message;
    }

    if (!structureType) {
        const error = new Error("Por favor, seleccione el tipo de estructura");
        errors.structureType = error.message;
    }

    if (!panelId) {
        const error = new Error("Por favor, seleccione el panel");
        errors.panelId = error.message;
    } else if (!mongoose.Types.ObjectId.isValid(panelId)) {
        const error = new Error("El panel no existe");
        errors.panelId = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const [
        panels,
        inverters,
        microinverters,
        meters,
        structures,
        peripherals,
        lines,
        protections,
        fixedCosts,
    ] = await Promise.all([
        Panel.find(),
        Inverter.find(),
        Microinverter.find(),
        Meter.find(),
        Structure.find(),
        Peripheral.find(),
        Line.find(),
        Protection.find(),
        FixedCosts.findOne(),
    ]);

    const stringsNumber = Math.ceil(modules / 11);

    const panel = panels.find((panel) => panel._id.equals(panelId));
    const panelsPower = modules * panel.power;
    const panelsPrice = modules * panel.price;

    const inverter =
        inverters.find((inverter) => {
            return (
                inverter.minCC <= panelsPower &&
                inverter.maxCC >= panelsPower &&
                inverter.current === current
            );
        }) || null;
    const inverterPrice = inverter && installationType === "String" ? inverter.price : 0;

    const microinverter =
        microinverters.find((microinverter) => {
            return (
                microinverter.minCC <= panel.power &&
                microinverter.maxCC >= panel.power &&
                microinverter.current === current
            );
        }) || null;
    const microinvertersPrice =
        microinverter && installationType === "Microinversor" ? microinverter.price * modules : 0;

    const meter =
        meters.find((meter) => {
            return (
                meter.minPanels <= modules &&
                meter.maxPanels >= modules &&
                meter.type === installationType &&
                meter.current === current
            );
        }) || null;
    const meterPrice = meter ? meter.price : 0;

    const structure = structures.find((structure) => {
        return structure.type === structureType;
    });
    const structurePrice = panelsPower * structure.price;

    const activePeripherals =
        peripherals.filter((peripheral) => {
            return peripheral.active && peripheral.type === installationType;
        }) || [];
    const peripheralsPrice = activePeripherals.reduce((acc, peripheral) => {
        return acc + peripheral.price;
    }, 0);

    const equipmentPrice =
        panelsPrice +
        inverterPrice +
        microinvertersPrice +
        meterPrice +
        structurePrice +
        peripheralsPrice;

    const line =
        lines.find((line) => {
            return line.minPower <= panelsPower && line.maxPower >= panelsPower;
        }) || null;
    const linePrice = line ? line.price : 0;
    const installationCost = linePrice * panelsPower;

    const protectionAC =
        protections.find((protection) => {
            return protection.protectionType === "AC" && protection.current === current;
        }) || null;
    const protectionACPrice = protectionAC ? protectionAC.price : 0;
    const protectionDC =
        protections.find((protection) => {
            return (
                protection.protectionType === "DC" &&
                protection.installationType === installationType
            );
        }) || null;
    const protectionDCPrice = protectionDC ? protectionDC.price * stringsNumber : 0;
    const protectionsPrice = protectionACPrice + protectionDCPrice;

    const additionalStringNumber =
        installationType === "String" && stringsNumber > 1 ? stringsNumber - 1 : 0;
    const additionalStringPrice = additionalStringNumber * fixedCosts.additionalString;

    const PMCost = fixedCosts.PMCost * modules;
    const transportCost = fixedCosts.transports * modules;
    const legalizationCost = fixedCosts.legalization;
    const feesCost = fixedCosts.fees;
    const technicalVisitCost = fixedCosts.technicalVisit;
    const acquisitionCosts = fixedCosts.acquisitionCosts;
    const operatingCosts = fixedCosts.operatingCosts;
    const maintenanceCost = fixedCosts.maintenanceCost;
    const totalFixedCosts =
        PMCost +
        transportCost +
        legalizationCost +
        feesCost +
        technicalVisitCost +
        acquisitionCosts +
        operatingCosts +
        maintenanceCost;

    const totalCost =
        equipmentPrice +
        installationCost +
        protectionsPrice +
        additionalStringPrice +
        totalFixedCosts;

    const totalCostWithMargin = totalCost + (totalCost * fixedCosts.profitability) / 100;
    const index = equipmentPrice / fixedCosts.index;

    const margin = index - totalCost;
    const profitability = margin / index * 100;

    const netPrice = profitability > fixedCosts.profitability ? index : totalCostWithMargin;

    const pvp = netPrice + (netPrice * fixedCosts.ivaRate) / 100;
    const profit = netPrice - totalCost;
    const eurosPerWatt = pvp / panelsPower;

    const rate = {
        general: {
            installationType,
            current,
        },
        equipment: {
            panel: {
                description: panel.description,
                power: panel.power,
                price: panel.price,
                modules: modules,
                totalPower: panelsPower,
                totalPrice: panelsPrice,
            },
            inverter: {
                hasInverter: installationType === "String" ? true : false,
                description: inverter ? inverter.description : "",
                power: inverter ? inverter.power : 0,
                range: inverter ? `${inverter.minCC} a ${inverter.maxCC}` : "",
                price: inverter ? inverter.price : 0,
            },
            microinverter: {
                hasMicroinverter: installationType === "Microinversor" ? true : false,
                description: microinverter ? microinverter.description : "",
                power: microinverter ? microinverter.power : 0,
                range: microinverter ? `${microinverter.minCC} a ${microinverter.maxCC}` : "",
                price: microinverter ? microinverter.price : 0,
                modules,
                totalPrice: microinvertersPrice,
            },
            meter: {
                hasMeter: meter ? true : false,
                description: meter ? meter.description : "",
                range: meter ? `${meter.minPanels} a ${meter.maxPanels}` : "",
                price: meter ? meter.price : 0,
            },
            structure: {
                type: structureType,
                description: structure.description,
                price: structure.price,
                totalPrice: structurePrice,
            },
            peripherals: {
                activePeripherals,
                totalPrice: peripheralsPrice,
            },
            total: equipmentPrice,
        },
        installation: {
            strings: {
                stringsNumber,
                additionalStringNumber,
                additionalStringPrice,
            },
            line: {
                hasLine: line ? true : false,
                description: line ? line.description : "",
                range: line ? `${line.minPower} a ${line.maxPower}` : "",
                price: line ? line.price : 0,
                installationCost,
            },
            protections: {
                protectionAC: {
                    hasProtectionAC: protectionAC ? true : false,
                    description: protectionAC ? protectionAC.description : "",
                    current: protectionAC ? protectionAC.current : 0,
                    price: protectionAC ? protectionAC.price : 0,
                },
                protectionDC: {
                    hasProtectionDC: protectionDC ? true : false,
                    description: protectionDC ? protectionDC.description : "",
                    current: protectionDC ? protectionDC.current : 0,
                    price: protectionDC ? protectionDC.price : 0,
                    totalPrice: protectionDCPrice,
                },
                totalPrice: protectionsPrice,
            },
            fixedCosts: {
                PMCost,
                transportCost,
                legalizationCost,
                feesCost,
                technicalVisitCost,
                acquisitionCosts,
                operatingCosts,
                maintenanceCost,
                total: totalFixedCosts,
            },
        },
        summary: {
            totalCost,
            totalCostWithMargin,
            index,
            margin,
            profitability,
            netPrice,
            pvp,
            profit,
            eurosPerWatt,
        },
    };

    res.json(rate);
};
