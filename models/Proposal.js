import mongoose from "mongoose";

const proposalSchema = mongoose.Schema(
    {
        uuid: {
            type: String,
            required: true,
        },
        placeId: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        latitude: {
            type: Number,
            required: true,
            default: 0,
        },
        longitude: {
            type: Number,
            required: true,
            default: 0,
        },
        consumption: {
            type: Number,
            required: true,
            default: 140,
        },
        kWhConsumed: {
            type: Number,
            required: true,
            default: 500,
        },
        contractedPower: {
            type: Number,
            required: true,
            default: 3.45,
        },
        panelsNumber: {
            type: Number,
            required: true,
            default: 10,
        },
        installationType: {
            type: String,
            required: true,
            enum: ["premium", "microinverters"],
            default: "premium",
        },
        hasBattery: {
            type: Boolean,
            required: true,
            default: false,
        },
        batteryBrand: {
            type: String,
            default: "",
        },
        paymenMethod: {
            type: String,
            required: true,
            enum: ["cash", "finance"],
            default: "cash",
        },
    },
    {
        timestamps: true,
    }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;
