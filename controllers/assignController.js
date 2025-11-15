// import Teacher from "../models/Teacher.js";

// export const assignClassToTeacher = async (req, res) => {
//   try {
//     const { teacherId, classId } = req.body;

//     if (!teacherId || !classId) {
//       return res.status(400).json({ message: "teacherId and classId are required" });
//     }

//     const teacher = await Teacher.findById(teacherId);
//     if (!teacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }

//     if (!teacher.assignedClasses.includes(classId)) {
//       teacher.assignedClasses.push(classId);
//     }

//     await teacher.save();

//     res.status(200).json({
//       message: "Class assigned to teacher successfully",
//       data: teacher
//     });
//   } catch (error) {
//     console.log("Assign Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



import Teacher from "../models/Teacher.js";
import Class from "../models/Class.js";

// ASSIGN CLASS
export const assignClassToTeacher = async (req, res) => {
  try {
    const { teacherId, classId } = req.body;

    if (!teacherId || !classId) {
      return res.status(400).json({ message: "teacherId and classId are required" });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    // Avoid duplicate assignment
    if (!teacher.assignedClasses.includes(classId)) {
      teacher.assignedClasses.push(classId);
      await teacher.save();
    }

    res.status(200).json({
      message: "Class assigned successfully",
      teacher
    });
  } catch (error) {
    console.log("Assign Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET ASSIGNED CLASSES (BY TEACHER)
export const getAssignedClasses = async (req, res) => {
  try {
    const { teacherId } = req.query;

    if (!teacherId)
      return res.status(400).json({ message: "teacherId is required" });

    const teacher = await Teacher.findById(teacherId).populate("assignedClasses");

    if (!teacher)
      return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json(teacher.assignedClasses);
  } catch (error) {
    console.log("Get Assigned Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// REMOVE ASSIGNED CLASS
export const removeAssignedClass = async (req, res) => {
  try {
    const assignmentId = req.params.id;

    const teachers = await Teacher.updateMany(
      { assignedClasses: assignmentId },
      { $pull: { assignedClasses: assignmentId } }
    );

    res.status(200).json({ message: "Assignment removed successfully" });
  } catch (error) {
    console.log("Remove Assign Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
