import mongoose from "mongoose";

const protectionSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        protectionType: {
            type: String,
            required: true,
            enum: ["DC", "AC"],
        },
        installationType: {
            type: String,
            required: true,
            enum: ["Todo", "String", "Microinversor"],
        },
        current: {
            type: String,
            required: true,
            enum: ["Todo", "Monofásico", "Trifásico"],
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

const Protection = mongoose.model("Protection", protectionSchema);

export default Protection;
