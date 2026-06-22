import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoutes from "./routes/chat.routes.js";


dotenv.config();


const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/chat", chatRoutes);


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "EPITA Career Compass API is running"
    });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});