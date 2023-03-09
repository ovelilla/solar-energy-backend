import mongoose from "mongoose";
import Contact from "../models/Contact.js";

export const readContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.json(contacts);
    } catch (error) {
        console.log(error);
    }
};

export const createContact = async (req, res) => {
    const { name, surname, email, phone } = req.body;

    const errors = {};

    if (!name) {
        const error = new Error("El nombre es obligatorio");
        errors.name = error.message;
    }

    if (!surname) {
        const error = new Error("Los apellidos son obligatorios");
        errors.surname = error.message;
    }

    // if (!email) {
    //     const error = new Error("El email es obligatorio");
    //     errors.email = error.message;
    // }

    // if (!phone) {
    //     const error = new Error("El teléfono es obligatorio");
    //     errors.phone = error.message;
    // }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const newContact = new Contact(req.body);

    try {
        const savedContact = await newContact.save();

        res.json({ message: "Contacto creado correctamente", contact: savedContact });
    } catch (error) {
        console.log(error);
    }
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, phone } = req.body;

    const errors = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El contacto no existe");
        errors.contact = error.message;
    }

    if (!name) {
        const error = new Error("El nombre es obligatorio");
        errors.name = error.message;
    }

    if (!surname) {
        const error = new Error("Los apellidos son obligatorios");
        errors.surname = error.message;
    }

    // if (!email) {
    //     const error = new Error("El email es obligatorio");
    //     errors.email = error.message;
    // }

    // if (!phone) {
    //     const error = new Error("El teléfono es obligatorio");
    //     errors.phone = error.message;
    // }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const foundContact = await Contact.findById(id);

    if (!foundContact) {
        const error = new Error("El contacto no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            {
                name,
                surname,
                email,
                phone,
            },
            { new: true }
        );

        res.json({
            message: "Contacto actualizado correctamente",
            contact: updatedContact,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El contacto no existe");
        return res.status(404).json({ message: error.message });
    }

    const foundContact = await Contact.findById(id);

    if (!foundContact) {
        const error = new Error("El contacto no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        await Contact.findByIdAndRemove(id);

        res.json({ message: "Contacto eliminado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteContacts = async (req, res) => {
    const { ids } = req.body;

    try {
        await Contact.deleteMany({ _id: { $in: ids } });

        res.json({ message: "Contactos eliminados correctamente" });
    } catch (error) {
        console.log(error);
    }
};
