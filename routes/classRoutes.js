// import express from "express";
// import { addClass } from "../controllers/classController.js";
// import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Only admin can add class
// router.post("/add", protect, authorizeRoles("admin"), addClass);

// export default router;


import express from "express";
import { addClass, getClassesBySchool, deleteClass } from "../controllers/classController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add class (admin only)
router.post("/add", protect, authorizeRoles("admin"), addClass);

// Get classes by schoolId (admin only)
router.get("/", protect, authorizeRoles("admin"), getClassesBySchool);

// Delete class
router.delete("/:id", protect, authorizeRoles("admin"), deleteClass);

export default router;
