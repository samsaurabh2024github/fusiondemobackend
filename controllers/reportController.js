import Session from "../models/Session.js";
// import Coach from "../models/Coach.js";

export const createSession = async (req, res) => {
  try {
    const coachId = req.user.id;

    const coach = await Coach.findById(coachId);
    if (!coach || !coach.school)
      return res.status(400).json({ message: "Coach not assigned to any school" });

    const session = await Session.create({
      coach: coachId,
      school: coach.school,
      date: req.body.date,
      attendance: req.body.attendance
    });

    res.status(201).json({ message: "Session created", session });

  } catch (error) {
    res.status(500).json({ message: "Session creation failed", error });
  }
};
