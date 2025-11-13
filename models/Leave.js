import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
