import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";


dotenv.config();


const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/chat", chatRoutes);

app.use(
    "/api/auth",
    authRoutes
);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "EPITA Career Compass API is running"
    });
});

// 404
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Internal server error"
    });
});