import mongoose from "mongoose";

const batterySchema = mongoose.Schema(
    {
        capacity: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        modules: {
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

const Battery = mongoose.model("Battery", batterySchema);

export default Battery;
