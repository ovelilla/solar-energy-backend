import mongoose from "mongoose";

const structureSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["Coplanar", "Inclinada"],
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

const Structure = mongoose.model("Structure", structureSchema);

export default Structure;
