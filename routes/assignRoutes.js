// import express from "express";
// import { assignClassToTeacher } from "../controllers/assignController.js";
// import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Only admin assigns class
// router.post("/teacher-class", protect, authorizeRoles("admin"), assignClassToTeacher);

// export default router;


import express from "express";
import {
  assignClassToTeacher,
  getAssignedClasses,
  removeAssignedClass
} from "../controllers/assignController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Assign class to teacher
router.post("/assign-class", protect, authorizeRoles("admin"), assignClassToTeacher);

// Get classes assigned to a teacher
router.get("/", protect, authorizeRoles("admin"), getAssignedClasses);

// Remove class assignment
router.delete("/:id", protect, authorizeRoles("admin"), removeAssignedClass);

export default router;
