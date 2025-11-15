import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true
  },
  className: {
    type: String,
    required: true
  }
});

const Class = mongoose.model("Class", classSchema);

export default Class;
