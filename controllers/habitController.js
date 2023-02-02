import mongoose from "mongoose";
import Habit from "../models/Habit.js";

export const readHabits = async (req, res) => {
    try {
        const habits = await Habit.find();

        res.json(habits);
    } catch (error) {
        console.log(error);
    }
};

export const createHabit = async (req, res) => {
    const { battery, habit, selfConsumption } = req.body;

    const errors = {};

    if (battery === "") {
        const error = new Error("La batería es obligatoria");
        errors.battery = error.message;
    }

    if (!habit) {
        const error = new Error("El hábito es obligatorio");
        errors.habit = error.message;
    }

    if (!selfConsumption) {
        const error = new Error("El autoconsumo es obligatorio");
        errors.selfConsumption = error.message;
    }

    if (selfConsumption && isNaN(selfConsumption)) {
        const error = new Error("El autoconsumo debe ser un número");
        errors.selfConsumption = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const newHabit = new Habit(req.body);

    try {
        const savedHabit = await newHabit.save();

        res.json({ message: "Hábito creado correctamente", habit: savedHabit });
    } catch (error) {
        console.log(error);
    }
};

export const updateHabit = async (req, res) => {
    const { id } = req.params;
    const { battery, habit, selfConsumption } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El hábito no existe");
        return res.status(404).json({ message: error.message });
    }

    if (battery === "") {
        const error = new Error("La batería es obligatoria");
        errors.battery = error.message;
    }

    if (!habit) {
        const error = new Error("El hábito es obligatorio");
        errors.habit = error.message;
    }

    if (!selfConsumption) {
        const error = new Error("El autoconsumo es obligatorio");
        errors.selfConsumption = error.message;
    }

    if (selfConsumption && isNaN(selfConsumption)) {
        const error = new Error("El autoconsumo debe ser un número");
        errors.selfConsumption = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const foundHabit = await Habit.findById(id);

    if (!foundHabit) {
        const error = new Error("El hábito no existe");
        return res.status(404).json({ message: error.message });
    }

    const updatedHabit = { battery, habit, selfConsumption, _id: id };

    try {
        await Habit.findByIdAndUpdate(id, updatedHabit, { new: true });

        res.json({
            message: "Hábito actualizado correctamente",
            habit: updatedHabit,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteHabit = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El hábito no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundHabit = await Habit.findById(id);

    if (!foundHabit) {
        const error = new Error("El hábito no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Habit.findByIdAndRemove(id);

        res.json({ message: "Hábito eliminado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteHabits = async (req, res) => {
    const { ids } = req.body;

    try {
        await Habit.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Hábitos eliminados correctamente" });
    } catch (error) {
        console.log(error);
    }
};
