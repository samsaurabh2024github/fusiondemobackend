import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  contactPerson: { type: String },
  phone: { type: String },
  programs: [String], // FSPE, SBPE-L1, SBPE-L2, etc.
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("School", schoolSchema);
