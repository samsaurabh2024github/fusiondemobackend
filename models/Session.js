import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  coach: { type: mongoose.Schema.Types.ObjectId, ref: "Coach", required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
  date: { type: Date, required: true },
  attendance: [
    {
      studentName: String,
      present: Boolean
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Session", sessionSchema);
