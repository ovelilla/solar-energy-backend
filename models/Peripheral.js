import mongoose from "mongoose";

const peripheralSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        type: {
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
        active: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Peripheral = mongoose.model("Peripheral", peripheralSchema);

export default Peripheral;
