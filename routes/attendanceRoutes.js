import express from "express";
import {
  addAttendance,
  getAttendanceById,
  getAllAttendances,
  updateAttendance,
  deleteAttendance
} from "../controllers/attendanceController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➤ Add attendance (COACH ONLY)
router.post("/add", protect, authorizeRoles("coach"), addAttendance);

// ➤ Get attendance by ID (COACH + ADMIN)
router.get("/:id", protect, getAttendanceById);

// ➤ Get all attendance with filters (COACH + ADMIN)
router.get("/", protect, getAllAttendances);

// ➤ Update attendance (ADMIN ONLY)
router.put("/:id", protect, authorizeRoles("admin"), updateAttendance);

// ➤ Delete attendance (ADMIN ONLY)
router.delete("/:id", protect, authorizeRoles("admin"), deleteAttendance);

export default router;
