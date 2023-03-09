import mongoose from "mongoose";
import Event from "../models/Event.js";
import Label from "../models/Label.js";
import getTextColor from "../helpers/getTextColor.js";

export const readEvent = async (id) => {
    const event = await Event.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "labels",
                localField: "labelId",
                foreignField: "_id",
                as: "label",
            },
        },
        {
            $addFields: {
                id: "$_id",
                backgroundColor: { $arrayElemAt: ["$label.color", 0] },
                borderColor: { $arrayElemAt: ["$label.color", 0] },
                textColor: { $arrayElemAt: ["$label.textColor", 0] },
            },
        },
        {
            $project: {
                _id: 0,
                label: 0,
            },
        },
    ]);

    return event[0];
};

export const readEvents = async (req, res) => {
    try {
        const events = await Event.aggregate([
            {
                $lookup: {
                    from: "labels",
                    localField: "labelId",
                    foreignField: "_id",
                    as: "label",
                },
            },
            {
                $addFields: {
                    id: "$_id",
                    backgroundColor: { $arrayElemAt: ["$label.color", 0] },
                    borderColor: { $arrayElemAt: ["$label.color", 0] },
                    textColor: { $arrayElemAt: ["$label.textColor", 0] },
                },
            },
            {
                $project: {
                    _id: 0,
                    label: 0,
                },
            },
        ]);

        res.json(events);
    } catch (error) {
        console.log(error);
    }
};

export const createEvent = async (req, res) => {
    const { title, start, end, allDay, labelId, description } = req.body;

    const errors = {};

    if (!title) {
        const error = new Error("El título es obligatorio");
        errors.title = error.message;
    }

    if (!start) {
        const error = new Error("La fecha de inicio es obligatorio");
        errors.start = error.message;
    }

    if (!end) {
        const error = new Error("La fecha de fin es obligatorio");
        errors.end = error.message;
    }

    if (!labelId) {
        const error = new Error("La etiqueta es obligatoria");
        errors.labelId = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const newEvent = new Event(req.body);

    try {
        const savedEvent = await newEvent.save();

        const eventWithColor = await readEvent(savedEvent._id);

        res.json({ message: "Evento creado correctamente", event: eventWithColor });
    } catch (error) {
        console.log(error);
    }
};

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, start, end, allDay, labelId, description } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El evento no existe");
        return res.status(404).json({ message: error.message });
    }

    if (!title) {
        const error = new Error("El título es obligatorio");
        errors.title = error.message;
    }

    if (!start) {
        const error = new Error("La fecha de inicio es obligatorio");
        errors.start = error.message;
    }

    if (!end) {
        const error = new Error("La fecha de fin es obligatorio");
        errors.end = error.message;
    }

    if (!labelId) {
        const error = new Error("La etiqueta es obligatoria");
        errors.labelId = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { title, start, end, allDay, labelId, description },
            { new: true }
        );

        if (!updatedEvent) {
            const error = new Error("El evento no existe");
            return res.status(404).json({ message: error.message });
        }

        const eventWithColor = await readEvent(updatedEvent._id);

        res.json({
            message: "Evento actualizado correctamente",
            event: eventWithColor,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateEventDrop = async (req, res) => {
    const { id } = req.params;
    const { start, end } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El evento no existe");
        return res.status(404).json({ message: error.message });
    }

    const errors = {};

    if (!start) {
        const error = new Error("La fecha de inicio es obligatorio");
        errors.start = error.message;
    }

    if (!end) {
        const error = new Error("La fecha de fin es obligatorio");
        errors.end = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, { start, end }, { new: true });

        if (!updatedEvent) {
            const error = new Error("El evento no existe");
            return res.status(404).json({ message: error.message });
        }

        const eventWithColor = await readEvent(updatedEvent._id);

        res.json({
            message: "Evento actualizado correctamente",
            event: eventWithColor,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateEventResize = async (req, res) => {
    const { id } = req.params;
    const { end } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El evento no existe");
        return res.status(404).json({ message: error.message });
    }

    const errors = {};

    if (!end) {
        const error = new Error("La fecha de fin es obligatorio");
        errors.end = error.message;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, { end }, { new: true });

        if (!updatedEvent) {
            const error = new Error("El evento no existe");
            return res.status(404).json({ message: error.message });
        }

        const eventWithColor = await readEvent(updatedEvent._id);

        res.json({
            message: "Evento actualizado correctamente",
            event: eventWithColor,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El evento no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            const error = new Error("El evento no existe");
            return res.status(404).json({ message: error.message });
        }

        res.json({ message: "Evento eliminado correctamente" });
    } catch (error) {
        console.log(error);
    }
};
