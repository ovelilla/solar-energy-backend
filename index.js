import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import proposalRoutes from "./routes/proposalRoutes.js";
import mapsRoutes from "./routes/mapsRoutes.js";
import pvgisRoutes from "./routes/pvgisRoutes.js";

import predefinedRoutes from "./routes/predefinedRoutes.js";
import orientationRoutes from "./routes/orientationRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";

import panelRoutes from "./routes/panelRoutes.js";
import batteryRoutes from "./routes/batteryRoutes.js";
import inverterRoutes from "./routes/inverterRoutes.js";
import microinverterRoutes from "./routes/microinverterRoutes.js";
import meterRoutes from "./routes/meterRoutes.js";
import structureRoutes from "./routes/structureRoutes.js";
import peripheralRoutes from "./routes/peripheralRoutes.js";

import protectionRoutes from "./routes/protectionRoutes.js";
import lineRoutes from "./routes/lineRoutes.js";

import fixedCostsRoutes from "./routes/fixedCostsRoutes.js";
import rateRoutes from "./routes/rateRoutes.js";

import eventRoutes from "./routes/eventRoutes.js";
import labelRoutes from "./routes/labelRoutes.js";

import contactRoutes from "./routes/contactRoutes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

dotenv.config();

await connectDB();

const whiteList = [process.env.LANDING_URL, process.env.CRM_URL, "https://postman.com"];

const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(corsOptions));

app.use("/api/user", userRoutes);
app.use("/api/proposal", proposalRoutes);
app.use("/api/maps", mapsRoutes);
app.use("/api/pvgis", pvgisRoutes);

app.use("/api/predefined", predefinedRoutes);
app.use("/api/orientation", orientationRoutes);
app.use("/api/habit", habitRoutes);

app.use("/api/panel", panelRoutes);
app.use("/api/battery", batteryRoutes);
app.use("/api/inverter", inverterRoutes);
app.use("/api/microinverter", microinverterRoutes);
app.use("/api/meter", meterRoutes);
app.use("/api/structure", structureRoutes);
app.use("/api/peripheral", peripheralRoutes);

app.use("/api/protection", protectionRoutes);
app.use("/api/line", lineRoutes);

app.use("/api/fixed-costs", fixedCostsRoutes);
app.use("/api/rate", rateRoutes);

app.use("/api/event", eventRoutes);
app.use("/api/label", labelRoutes);

app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
