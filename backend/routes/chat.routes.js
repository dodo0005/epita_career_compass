import express from "express";
import { chat, getSessions, getHistory } from "../controllers/chat.controller.js";

import {
    authenticate
} from "../middleware/auth.middleware.js";


const router = express.Router();

router.post(
    "/",
    authenticate,
    chat
);

router.get(
    "/sessions",
    authenticate,
    getSessions
);

router.get(
    "/history/:id",
    authenticate,
    getHistory
);

export default router;