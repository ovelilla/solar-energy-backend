import mongoose from "mongoose";

const habitSchema = mongoose.Schema(
    {
        battery: {
            type: Boolean,
            required: true,
        },
        habit: {
            type: String,
            required: true,
            enum: ["Mañana", "Mediodía", "Tarde-noche"],
        },
        selfConsumption: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
