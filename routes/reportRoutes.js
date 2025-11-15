import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { createSession } from "../controllers/reportController.js";

const router = express.Router();

// Coach only
router.post("/create", protect, authorizeRoles("coach"), createSession);

export default router;
