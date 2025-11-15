// import express from "express";
// import { addTeacher } from "../controllers/teacherController.js";
// import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Admin only
// router.post("/add", protect, authorizeRoles("admin"), addTeacher);

// export default router;


import express from "express";
import { 
  addTeacher, 
  getTeachersBySchool, 
  deleteTeacher 
} from "../controllers/teacherController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add teacher
router.post("/add", protect, authorizeRoles("admin"), addTeacher);

// Get teachers by school
router.get("/", protect, authorizeRoles("admin"), getTeachersBySchool);

// Delete teacher
router.delete("/:id", protect, authorizeRoles("admin"), deleteTeacher);

export default router;

