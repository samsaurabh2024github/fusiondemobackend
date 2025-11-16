// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Example protected route
// router.get("/", protect, (req, res) => {
//   res.json({ message: "Welcome Coach! You are authenticated 🎯", user: req.user });
// });

// export default router;




import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { addCoach, assignCoachToSchool } from "../controllers/coachController.js";
import Coach from "../models/Coach.js";

const router = express.Router();

// Only logged-in users (any role)
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome Coach!", user: req.user });
});

router.get("/all", async (req, res) => {
  const coaches = await Coach.find().populate("school", "name");
  res.json(coaches);
});


// Only admin can access this route
router.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin dashboard data" });
});

router.post("/assign", protect, authorizeRoles("admin"), assignCoachToSchool);


router.post("/add", protect, authorizeRoles("admin"), addCoach);

export default router;

