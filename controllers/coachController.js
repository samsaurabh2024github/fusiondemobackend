import Coach from "../models/Coach.js";


export const assignCoachToSchool = async (req, res) => {
  try {
    const { coachId, schoolId } = req.body;

    const coach = await Coach.findById(coachId);
    if (!coach) return res.status(404).json({ message: "Coach not found" });

    coach.school = schoolId;
    await coach.save();

    res.json({ message: "Coach assigned successfully", coach });
  } catch (error) {
    console.log("ASSIGN COACH ERROR:", error);  // <-- add this to see errors
    res.status(500).json({ message: "Assignment failed", error });
  }
};



export const addCoach = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Coach.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Coach already exists" });
    }

    const coach = await Coach.create({
      name,
      email,
      password,
      phone,
      role: "coach"
    });

    res.status(201).json({ message: "Coach added successfully", coach });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find().select("-password");
    res.json(coaches);
  } catch (error) {
    console.log("GET COACHES ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};