// import Class from "../models/Class.js";

// export const addClass = async (req, res) => {
//   try {
//     const { schoolId, className } = req.body;

//     if (!schoolId || !className) {
//       return res.status(400).json({ message: "schoolId and className are required" });
//     }

//     const newClass = await Class.create({
//       schoolId,
//       className,
//     });

//     return res.status(201).json({
//       message: "Class created successfully",
//       data: newClass
//     });

//   } catch (error) {
//     console.error("Add Class Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };





import Class from "../models/Class.js";

// ADD CLASS
export const addClass = async (req, res) => {
  try {
    const { schoolId, className } = req.body;

    if (!schoolId || !className) {
      return res.status(400).json({ message: "schoolId and className are required" });
    }

    const newClass = await Class.create({
      schoolId,
      className,
    });

    return res.status(201).json({
      message: "Class created successfully",
      data: newClass
    });

  } catch (error) {
    console.error("Add Class Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// GET CLASSES BY SCHOOL
export const getClassesBySchool = async (req, res) => {
  try {
    const { schoolId } = req.query;

    if (!schoolId) {
      return res.status(400).json({ message: "schoolId is required" });
    }

    const classes = await Class.find({ schoolId });

    return res.status(200).json(classes);

  } catch (error) {
    console.error("GET CLASS ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// DELETE CLASS
export const deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;

    const deleted = await Class.findByIdAndDelete(classId);

    if (!deleted) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Delete Class Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
