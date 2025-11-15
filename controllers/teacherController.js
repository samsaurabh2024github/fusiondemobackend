// import Teacher from "../models/Teacher.js";

// export const addTeacher = async (req, res) => {
//   try {
//     const { schoolId, name, sports } = req.body;

//     if (!schoolId || !name || !sports) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const teacher = await Teacher.create({ schoolId, name, sports });

//     res.status(201).json({
//       message: "Teacher added successfully",
//       data: teacher
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



import Teacher from "../models/Teacher.js";

// ADD TEACHER
export const addTeacher = async (req, res) => {
  try {
    const { schoolId, name, sports } = req.body;

    if (!schoolId || !name || !sports) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const teacher = await Teacher.create({ schoolId, name, sports });

    res.status(201).json({
      message: "Teacher added successfully",
      data: teacher
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


// GET TEACHERS BY SCHOOL
export const getTeachersBySchool = async (req, res) => {
  try {
    const { schoolId } = req.query;

    if (!schoolId) {
      return res.status(400).json({ message: "schoolId is required" });
    }

    const teachers = await Teacher.find({ schoolId });

    res.status(200).json(teachers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


// DELETE TEACHER
export const deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
