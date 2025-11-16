// import express from "express";
// import { assignClassToTeacher } from "../controllers/assignController.js";
// import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Only admin assigns class
// router.post("/teacher-class", protect, authorizeRoles("admin"), assignClassToTeacher);

// export default router;

import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

import {
  assignClassToCoach,
  getAssignedClasses,
  removeAssignedClass
} from "../controllers/assignController.js";

const router = express.Router();

// Assign class to coach (Admin)
router.post("/coach-class", protect, authorizeRoles("admin"), assignClassToCoach);

// Get assigned classes (Coach)
router.get("/", protect, getAssignedClasses);

// Remove assigned class (Admin)
router.delete("/:id", protect, authorizeRoles("admin"), removeAssignedClass);

export default router;
