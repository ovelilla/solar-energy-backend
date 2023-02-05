import mongoose from "mongoose";

const predefinedSchema = mongoose.Schema(
    {
        lastInvoiceEnergyCost: {
            type: Number,
            required: true,
        },
        kWhConsumedLastBill: {
            type: Number,
            required: true,
        },
        monthlyEnergyConsumption: {
            type: Number,
            required: true,
        },
        contractedPowerInKW: {
            type: Number,
            required: true,
        },
        avgPriceKWContractedPowerAnnual: {
            type: Number,
            required: true,
        },
        ivaRate: {
            type: Number,
            required: true,
        },
        estimatedCoverage: {
            type: Number,
            required: true,
        },
        roofOrientation: {
            type: String,
            required: true,
            enum: ["Sur", "Este", "Oeste", "Este + Oeste"],
        },
        slope: {
            type: Number,
            required: true,
        },
        installationType: {
            type: String,
            required: true,
            enum: ["String", "Microinversor"],
        },
        potentialRadiationPerkWYear: {
            type: Number,
            required: true,
        },
        consumptionHabit: {
            type: String,
            required: true,
            enum: ["Mañana", "Mediodía", "Tarde-noche"],
        },
        battery: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Predefined = mongoose.model("Predefined", predefinedSchema);

export default Predefined;
