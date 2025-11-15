import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import coachRoutes from "./routes/coachRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

import teacherRoutes from "./routes/teacherRoutes.js";
// import leaveRoutes from "./routes/leaveRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

import assignRoutes from "./routes/assignRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Base route
app.get("/", (req, res) => res.send("FusionMain API Running 🚀"));

// // API routes
app.use("/api/auth", authRoutes);
app.use("/api/admin/class", classRoutes);
app.use("/api/coaches", coachRoutes);
app.use("/api/reports", reportRoutes);
// app.use("/api/leaves", leaveRoutes);
app.use("/api/schools", schoolRoutes);



app.use("/api/assign", assignRoutes);

app.use("/api/teacher", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
