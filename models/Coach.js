// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const coachSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//     },
//    school: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "School",
//   default: null
// }
// ,
//     role: {
//       type: String,
//       enum: ["admin", "coach"],
//       default: "coach",
//     },
//   },
//   { timestamps: true }
// );

// // Hash password before save
// coachSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Compare password
// coachSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const Coach = mongoose.model("Coach", coachSchema);
// export default Coach;




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

    // Coach belongs to a school
    school: [
        {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
   
     }
],

    // VERY VERY IMPORTANT: Assigned classes
    assignedClasses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      }
    ],

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
