import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  date: {
    type: String,
    required: true
  },
  totalPresent: {
    type: Number,
    required: true
  }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
