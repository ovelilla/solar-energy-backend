import mongoose from "mongoose";

const panelSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        power: {
            type: Number,
            required: true,
        },
        warranty: {
            type: Number,
            required: true,
        },
        efficiency: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Panel = mongoose.model("Panel", panelSchema);

export default Panel;
