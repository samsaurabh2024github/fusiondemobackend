// import Attendance from "../models/Attendance.js";
// import Coach from "../models/Coach.js";
// import mongoose from "mongoose";

// // ➤ Add attendance (COACH ONLY)
// export const addAttendance = async (req, res) => {
//   try {
//     const coachId = req.user.id; // from JWT
//     const { classId, date, totalPresent } = req.body;

//     if (!classId || !date || !totalPresent) {
//       return res.status(400).json({
//         message: "classId, date and totalPresent are required",
//       });
//     }

//     // ⭐ CHECK: Is coach assigned to this class?
//     const coach = await Coach.findById(coachId);

//     if (!coach) {
//       return res.status(404).json({ message: "Coach not found" });
//     }

//     const isAssigned = coach.assignedClasses?.includes(classId);

//     if (!isAssigned) {
//       return res.status(403).json({
//         message: "You are not assigned to this class",
//       });
//     }

//     // ➤ Save attendance
//     const data = await Attendance.create({
//       classId,
//       teacherId: coachId, // keep teacherId field for compatibility
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

// // ➤ Get attendance by ID
// export const getAttendanceById = async (req, res) => {
//   try {
//     const attendance = await Attendance.findById(req.params.id);
//     if (!attendance) {
//       return res.status(404).json({ message: "Attendance not found" });
//     }

//     return res.status(200).json(attendance);
//   } catch (error) {
//     console.log("Get Attendance Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // ➤ Get ALL attendance
// export const getAllAttendances = async (req, res) => {
//   try {
//     const { classId, teacherId, date } = req.query;
//     const filter = {};

//     if (classId && mongoose.Types.ObjectId.isValid(classId))
//       filter.classId = classId;

//     if (teacherId && mongoose.Types.ObjectId.isValid(teacherId))
//       filter.teacherId = teacherId;

//     if (date) filter.date = date;

//     const records = await Attendance.find(filter).sort({ date: -1 });

//     return res.status(200).json(records);
//   } catch (error) {
//     console.log("Get All Attendance Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // ➤ Update attendance (ADMIN ONLY)
// export const updateAttendance = async (req, res) => {
//   try {
//     const { totalPresent, date } = req.body;

//     const attendance = await Attendance.findById(req.params.id);
//     if (!attendance) {
//       return res.status(404).json({ message: "Attendance not found" });
//     }

//     if (totalPresent) attendance.totalPresent = totalPresent;
//     if (date) attendance.date = date;

//     await attendance.save();

//     return res.status(200).json({
//       message: "Attendance updated",
//       data: attendance,
//     });
//   } catch (error) {
//     console.log("Update Attendance Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // ➤ Delete attendance (ADMIN ONLY)
// export const deleteAttendance = async (req, res) => {
//   try {
//     const deleted = await Attendance.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({ message: "Attendance record not found" });
//     }

//     return res.status(200).json({ message: "Attendance deleted" });
//   } catch (error) {
//     console.log("Delete Attendance Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };




import Attendance from "../models/Attendance.js";
import mongoose from "mongoose";
import Coach from "../models/Coach.js"; // adjust import path if needed

// Helper to validate ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// ➤ Add attendance (Coach only)
// export const addAttendance = async (req, res) => {
//   try {
//     const coachId = req.user.id; // from protect middleware
//     const {
//       date,
//       schoolId,
//       classId,
//       period,
//       program,
//       className,
//       section,
//       attendance,   
//       strength,     
//       absent,      
//       activity,
//       reason
//     } = req.body;

    
//     if (!date || !schoolId || !classId || !period || !program || !className) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     if (attendance == null && strength == null) {
//       return res.status(400).json({ message: "attendance or strength is required" });
//     }

//     if (!isValidId(schoolId) || !isValidId(classId)) {
//       return res.status(400).json({ message: "Invalid schoolId or classId" });
//     }

   
//     let finalAbsent = absent;
//     if (finalAbsent == null) {
//       if (strength != null && attendance != null) {
//         finalAbsent = Number(strength) - Number(attendance);
//         if (finalAbsent < 0) finalAbsent = 0;
//       } else {
//         finalAbsent = 0;
//       }
//     }

//     const record = await Attendance.create({
//       coachId,
//       schoolId,
//       classId,
//       date,
//       period,
//       program,
//       className,
//       section,
//       attendance: attendance != null ? Number(attendance) : 0,
//       activity: activity || "",
//       strength: strength != null ? Number(strength) : Number(attendance || 0),
//       absent: Number(finalAbsent),
//       reason: reason || ""
//     });

//     return res.status(201).json({ message: "Attendance saved", data: record });
//   } catch (error) {
//     console.error("Add Attendance Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



// controllers/attendanceController.js

export const addAttendance = async (req, res) => {
  try {
    const coachId = req.user.id; // from protect middleware
    const {
      date,
      schoolId,
      classId,
      period,
      program,
      className,
      section,
      attendance,   // present count
      strength,     // total students
      absent,       // optional
      activity,     // may be empty from frontend
      reason,       // for not conducted
    } = req.body;

    // 1) Basic required fields
    if (!date || !schoolId || !classId || !period || !program || !className || !section) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!isValidId(schoolId) || !isValidId(classId)) {
      return res.status(400).json({ message: "Invalid schoolId or classId" });
    }

    const strengthNum = strength != null ? Number(strength) : 0;
    const attendanceNum = attendance != null ? Number(attendance) : 0;

    // 2) Detect if class is conducted or not
    const classNotConducted = strengthNum === 0 && attendanceNum === 0;

    // 3) Validation for "not conducted" case
    if (classNotConducted) {
      if (!reason || reason.trim().length < 3) {
        return res.status(400).json({
          message: "Reason is required when class is not conducted",
        });
      }
    } else {
      // 4) Validation for normal conducted class
      if (strength == null) {
        return res.status(400).json({ message: "Class strength is required" });
      }
      if (attendance == null) {
        return res.status(400).json({ message: "Present count is required" });
      }
      if (attendanceNum > strengthNum) {
        return res.status(400).json({
          message: "Present cannot be more than class strength",
        });
      }
    }

    // 5) Decide final activity text
    let activityToSave = (activity || "").trim();
    if (!classNotConducted && !activityToSave) {
      // class conducted but no activity
      return res
        .status(400)
        .json({ message: "Activity is required when class is conducted" });
    }
    if (classNotConducted && !activityToSave) {
      activityToSave = "Class not conducted";
    }

    // 6) Calculate absent if not provided
    let finalAbsent = absent;
    if (finalAbsent == null) {
      finalAbsent = Math.max(0, strengthNum - attendanceNum);
    }

    const record = await Attendance.create({
      coachId,
      schoolId,
      classId,
      date,
      period,
      program,
      className,
      section,
      attendance: attendanceNum,
      strength: strengthNum,
      absent: Number(finalAbsent),
      activity: activityToSave,
      reason: reason || "",
    });

    return res.status(201).json({ message: "Attendance saved", data: record });
  } catch (error) {
    console.error("Add Attendance Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};




// ➤ Get attendance by id (Admin + Coach)
export const getAttendanceById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const att = await Attendance.findById(id).populate("schoolId", "name").populate("classId", "className").populate("coachId", "name email");
    if (!att) return res.status(404).json({ message: "Attendance not found" });

    return res.status(200).json(att);
  } catch (error) {
    console.error("Get Attendance Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ➤ Get all (with filters) — Admin can see all, coach sees their own
// export const getAllAttendances = async (req, res) => {
//   try {
//     const { schoolId, classId, coachId, date, program, period } = req.query;
//     const filter = {};

//     // If logged-in user is a coach, restrict to their records unless admin
//     if (req.user && req.user.role === "coach") {
//       filter.coachId = req.user.id;
//     } else if (coachId && isValidId(coachId)) {
//       filter.coachId = coachId;
//     }

//     if (schoolId && isValidId(schoolId)) filter.schoolId = schoolId;
//     if (classId && isValidId(classId)) filter.classId = classId;
//     if (date) filter.date = date;
//     if (program) filter.program = program;
//     if (period) filter.period = period;

//     const records = await Attendance.find(filter).sort({ date: -1, createdAt: -1 });
//     return res.status(200).json(records);
//   } catch (error) {
//     console.error("Get All Attendance Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

export const getAllAttendances = async (req, res) => {
  try {
    const { schoolId, classId, coachId, date, program, period } = req.query;
    const filter = {};

    // If logged-in user is a coach → show own records only
    if (req.user && req.user.role === "coach") {
      filter.coachId = req.user.id;
    } 

    // Admin wants a specific coach
    else if (coachId && isValidId(coachId)) {
      filter.coachId = coachId;
    }

    if (schoolId && isValidId(schoolId)) filter.schoolId = schoolId;
    if (classId && isValidId(classId)) filter.classId = classId;
    if (date) filter.date = date;
    if (program) filter.program = program;
    if (period) filter.period = period;

    // ⭐ POPULATE FULL DATA FOR ADMIN TABLE
    const records = await Attendance.find(filter)
      .populate("coachId", "name email")
      .populate("schoolId", "name")
      .populate("classId", "className")
      .sort({ date: -1, createdAt: -1 });

    return res.status(200).json(records);
  } catch (error) {
    console.error("Get All Attendance Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// ➤ Update (Admin only) — allow update of attendance fields
export const updateAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const attendance = await Attendance.findById(id);
    if (!attendance) return res.status(404).json({ message: "Attendance not found" });

    const updatable = [
      "date","period","program","className","section",
      "attendance","strength","absent","activity","reason","schoolId","classId"
    ];

    updatable.forEach((field) => {
      if (req.body[field] !== undefined) attendance[field] = req.body[field];
    });

    // If absent missing but strength & attendance exist, recalc
    if ((req.body.absent === undefined) && attendance.strength != null && attendance.attendance != null) {
      attendance.absent = Number(attendance.strength) - Number(attendance.attendance);
      if (attendance.absent < 0) attendance.absent = 0;
    }

    await attendance.save();
    return res.status(200).json({ message: "Attendance updated", data: attendance });
  } catch (error) {
    console.error("Update Attendance Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ➤ Delete (Admin only)
export const deleteAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const deleted = await Attendance.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Attendance not found" });

    return res.status(200).json({ message: "Attendance deleted" });
  } catch (error) {
    console.error("Delete Attendance Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
