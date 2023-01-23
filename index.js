import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import proposalRoutes from "./routes/proposalRoutes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

dotenv.config();

// await connectDB();

const whiteList = [process.env.LANDING_URL, process.env.CRM_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

// app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/proposal", proposalRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
