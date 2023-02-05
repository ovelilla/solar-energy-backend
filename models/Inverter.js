import mongoose from "mongoose";

const inverterSchema = mongoose.Schema(
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
        type: {
            type: String,
            required: true,
            enum: ["Monofásico", "Trifásico"],
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

const Inverter = mongoose.model("Inverter", inverterSchema);

export default Inverter;
