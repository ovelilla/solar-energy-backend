import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

import proposalRoutes from "./routes/proposalRoutes.js";

import batteryRoutes from "./routes/batteryRoutes.js";

import predefinedRoutes from "./routes/predefinedRoutes.js";
import orientationRoutes from "./routes/orientationRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";

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

app.use("/api/battery", batteryRoutes);

app.use("/api/predefined", predefinedRoutes);
app.use("/api/orientation", orientationRoutes);
app.use("/api/habit", habitRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
