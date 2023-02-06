import mongoose from "mongoose";

const meterSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        minPanels: {
            type: Number,
            required: true,
        },
        maxPanels: {
            type: Number,
            required: true,
        },
        current: {
            type: String,
            required: true,
            enum: ["Monofásico", "Trifásico"],
        },
        type: {
            type: String,
            required: true,
            enum: ["String", "Microinversor"],
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

const Meter = mongoose.model("Meter", meterSchema);

export default Meter;
