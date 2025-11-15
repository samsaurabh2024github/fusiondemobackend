// import express from "express";
// import { register, login } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// export default router;



// routes/authRoutes.js
import express from "express";
import { register, registerAdmin, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);          // register coach
router.post("/register-admin", registerAdmin); // create admin (requires adminSecret)
router.post("/login", login);

export default router;
