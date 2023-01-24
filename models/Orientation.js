import mongoose from "mongoose";

const orientationSchema = mongoose.Schema(
    {
        orientation: {
            type: String,
            required: true,
            enum: ["south", "east", "west", "east+west"],
        },
        type: {
            type: String,
            required: true,
            enum: ["string", "microinverter"],
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
