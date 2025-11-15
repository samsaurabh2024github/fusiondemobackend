import express from "express";
import {
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} from "../controllers/schoolController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only routes
router.post("/", protect, authorizeRoles("admin"), createSchool);
router.get("/", protect, authorizeRoles("admin"), getSchools);
router.get("/:id", protect, authorizeRoles("admin"), getSchoolById);
router.put("/:id", protect, authorizeRoles("admin"), updateSchool);
router.delete("/:id", protect, authorizeRoles("admin"), deleteSchool);

export default router;
