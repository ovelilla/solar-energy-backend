import mongoose from "mongoose";

const fixedCostsSchema = mongoose.Schema(
    {
        PMCost: {
            type: Number,
            required: true,
        },
        transports: {
            type: Number,
            required: true,
        },
        legalization: {
            type: Number,
            required: true,
        },
        fees: {
            type: Number,
            required: true,
        },
        technicalVisit: {
            type: Number,
            required: true,
        },
        acquisitionCosts: {
            type: Number,
            required: true,
        },
        operatingCosts: {
            type: Number,
            required: true,
        },
        maintenanceCost: {
            type: Number,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        netPrice: {
            type: Number,
            required: true,
        },
        ivaRate: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const FixedCosts = mongoose.model("FixedCosts", fixedCostsSchema);

export default FixedCosts;
