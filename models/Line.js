import mongoose from "mongoose";

const lineSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        minPower: {
            type: Number,
            required: true,
        },
        maxPower: {
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

const Line = mongoose.model("Line", lineSchema);

export default Line;
