// import express from "express";
// import {
//   addAttendance,
//   getAttendanceById,
//   getAllAttendances,
//   updateAttendance,
//   deleteAttendance
// } from "../controllers/attendanceController.js";

// import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ➤ Add attendance (COACH ONLY)
// router.post("/add", protect, authorizeRoles("coach"), addAttendance);

// // ➤ Get attendance by ID (COACH + ADMIN)
// router.get("/:id", protect, getAttendanceById);

// // ➤ Get all attendance with filters (COACH + ADMIN)
// router.get("/", protect, getAllAttendances);

// // ➤ Update attendance (ADMIN ONLY)
// router.put("/:id", protect, authorizeRoles("admin"), updateAttendance);

// // ➤ Delete attendance (ADMIN ONLY)
// router.delete("/:id", protect, authorizeRoles("admin"), deleteAttendance);

// export default router;



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

// Coach adds attendance (requires login)
router.post("/add", protect, addAttendance);

// Get all (protected: coaches see own; admins see all)
router.get("/", protect, getAllAttendances);

// Get by id
router.get("/:id", protect, getAttendanceById);

// Update (admin only)
router.put("/:id", protect, authorizeRoles("admin"), updateAttendance);

// Delete (admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteAttendance);

export default router;
