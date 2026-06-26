import express from "express";
import { chat } from "../controllers/chat.controller.js";

import {
    authenticate
} from "../middleware/auth.middleware.js";


const router = express.Router();

router.post(
    "/",
    authenticate,
    chat
);

export default router;