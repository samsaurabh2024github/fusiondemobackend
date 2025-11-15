import School from "../models/school.js";

export const createSchool = async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.status(201).json({ message: "School added", school });
  } catch (e) {
    res.status(500).json({ message: "Error adding school", e });
  }
};

export const getSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (e) {
    res.status(500).json({ message: "Error fetching schools", e });
  }
};

export const getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: "School not found" });
    res.json(school);
  } catch (e) {
    res.status(500).json({ message: "Error", e });
  }
};

export const updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "School updated", school });
  } catch (e) {
    res.status(500).json({ message: "Error updating school", e });
  }
};

export const deleteSchool = async (req, res) => {
  try {
    await School.findByIdAndDelete(req.params.id);
    res.json({ message: "School deleted" });
  } catch (e) {
    res.status(500).json({ message: "Error deleting school", e });
  }
};
