import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const coachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    role: {
      type: String,
      enum: ["admin", "coach"],
      default: "coach",
    },
  },
  { timestamps: true }
);

// Hash password before save
coachSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
coachSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Coach = mongoose.model("Coach", coachSchema);
export default Coach;
