import mongoose from "mongoose";

const proposalSchema = mongoose.Schema(
    {
        clientIp: {
            type: String,
            required: true,
            trim: true,
        },
        uuid: {
            type: String,
            required: true,
        },
        address: {
            type: Object,
            required: true,
            default: null,
            placeId: {
                type: String,
                required: true,
                trim: true,
            },
            formattedAddress: {
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
            components: {
                type: Object,
                required: true,
                default: null,
            },
        },
        consumption: {
            type: Object,
            default: null,
        },
        installation: {
            type: Object,
            default: null,
        },
        pvgis: {
            type: Object,
            default: null,
            monthly: {
                type: Array,
                default: [],
            },
            totals: {
                type: Object,
                default: null,
            },
        },
        summary: {
            type: Object,
            default: null,
        },
        payment: {
            type: Object,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;
