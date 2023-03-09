import mongoose from "mongoose";

const labelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            required: true,
        },
        textColor: {
            type: String,
            default: "#000000",
        },
        isSpecial: {
            type: Boolean,
            default: false,
        },
        isEnabled: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Label = mongoose.model("Label", labelSchema);

export default Label;
