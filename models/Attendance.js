// import mongoose from "mongoose";

// const attendanceSchema = new mongoose.Schema({
//   classId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Class",
//     required: true
//   },
//   teacherId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Teacher",
//     required: true
//   },
//   date: {
//     type: String,
//     required: true
//   },
//   totalPresent: {
//     type: Number,
//     required: true
//   }
// });

// const Attendance = mongoose.model("Attendance", attendanceSchema);
// export default Attendance;



import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    coachId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
      required: true,
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    // Date of attendance
    date: {
      type: String,  // yyyy-mm-dd format
      required: true,
    },

    // Period: 1,2,3,4,1-5,ALL,NA
    period: {
      type: String,
      enum: [
        "1","2","3","4","5","6","7","8","9","10","11","12", 
        "1-5","ALL","NA"
      ],
      required: true,
    },

    // Program type
    program: {
      type: String,
      enum: [
        "FSPE",
        "SBPE-L1",
        "SBPE-L2",
        "PAPE-L1",
        "PAPE-L2"
      ],
      required: true,
    },

    // Class name: nur,lkg,ukg,1,2,3...
    className: {
      type: String,
      required: true,
    },

    // Section: a,b,c,d,e,f,all,eng med, guj med, cbse
    section: {
      type: String,
      required: true,
    },

    // Attendance marked presence
    attendance: {
      type: Number,
      required: true,
    },

    // Activity performed
    activity: {
      type: String,
      required: true,
    },

    // Total students
    strength: {
      type: Number,
      required: true,
    },

    // Absent count
    absent: {
      type: Number,
      required: true,
    },

    // If class not conducted -> reason is required
    reason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
