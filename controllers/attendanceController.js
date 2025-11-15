import Attendance from "../models/Attendance.js";
import mongoose from "mongoose";
import Teacher from "../models/Teacher.js";

// ➤ Add attendance (COACH ONLY)
// export const addAttendance = async (req, res) => {
//   try {
//     const teacherId = req.user.id; // FROM TOKEN
//     const { classId, date, totalPresent } = req.body;

//     if (!classId || !date || !totalPresent) {
//       return res.status(400).json({
//         message: "classId, date and totalPresent are required",
//       });
//     }

//     const data = await Attendance.create({
//       classId,
//       teacherId,
//       date,
//       totalPresent,
//     });

//     return res.status(201).json({
//       message: "Attendance saved",
//       data,
//     });
//   } catch (error) {
//     console.log("Attendance Add Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// ➤ Add attendance (COACH ONLY)
export const addAttendance = async (req, res) => {
  try {
    const teacherId = req.user.id; // FROM TOKEN
    const { classId, date, totalPresent } = req.body;

    if (!classId || !date || !totalPresent) {
      return res.status(400).json({
        message: "classId, date and totalPresent are required",
      });
    }

    // ⭐ CHECK: Is teacher assigned to this class?
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const isAssigned = teacher.assignedClasses.includes(classId);

    if (!isAssigned) {
      return res.status(403).json({
        message: "You are not assigned to this class",
      });
    }

    // ➤ Save attendance
    const data = await Attendance.create({
      classId,
      teacherId,
      date,
      totalPresent,
    });

    return res.status(201).json({
      message: "Attendance saved",
      data,
    });
  } catch (error) {
    console.log("Attendance Add Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// ➤ Get attendance by ID (ADMIN + COACH)
export const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    return res.status(200).json(attendance);
  } catch (error) {
    console.log("Get Attendance Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ➤ Get ALL attendance (optional filters)
export const getAllAttendances = async (req, res) => {
  try {
    const { classId, teacherId, date } = req.query;
    const filter = {};

    if (classId && mongoose.Types.ObjectId.isValid(classId))
      filter.classId = classId;

    if (teacherId && mongoose.Types.ObjectId.isValid(teacherId))
      filter.teacherId = teacherId;

    if (date) filter.date = date;

    const records = await Attendance.find(filter).sort({ date: -1 });

    return res.status(200).json(records);
  } catch (error) {
    console.log("Get All Attendance Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ➤ Update attendance (ADMIN ONLY)
export const updateAttendance = async (req, res) => {
  try {
    const { totalPresent, date } = req.body;

    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    if (totalPresent) attendance.totalPresent = totalPresent;
    if (date) attendance.date = date;

    await attendance.save();

    return res.status(200).json({
      message: "Attendance updated",
      data: attendance,
    });
  } catch (error) {
    console.log("Update Attendance Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ➤ Delete attendance (ADMIN ONLY)
export const deleteAttendance = async (req, res) => {
  try {
    const deleted = await Attendance.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Attendance record not found" });
    }

    return res.status(200).json({ message: "Attendance deleted" });
  } catch (error) {
    console.log("Delete Attendance Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
