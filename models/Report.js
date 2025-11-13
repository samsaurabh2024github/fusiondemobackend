import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    classesTaken: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
