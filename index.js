import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

dotenv.config();


const whiteList = [process.env.FRONTEND_URL];

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

app.use("/", (req, res) => {
    res.send("Hello World");
});

// app.use("/api/user", userRoutes);
// app.use("/api/project", projectRoutes);
// app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});