import mongoose from "mongoose";

const orientationSchema = mongoose.Schema(
    {
        orientation: {
            type: String,
            required: true,
            enum: ["Sur", "Este", "Oeste", "Este + Oeste"],
        },
        type: {
            type: String,
            required: true,
            enum: ["String", "Microinversor"],
        },
        performance: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Orientation = mongoose.model("Orientation", orientationSchema);

export default Orientation;
