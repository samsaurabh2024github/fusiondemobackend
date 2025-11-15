export const assignCoachToSchool = async (req, res) => {
  try {
    const { coachId, schoolId } = req.body;

    const coach = await Coach.findById(coachId);
    if (!coach) return res.status(404).json({ message: "Coach not found" });

    coach.school = schoolId;
    await coach.save();

    res.json({ message: "Coach assigned successfully", coach });
  } catch (error) {
    res.status(500).json({ message: "Assignment failed", error });
  }
};
