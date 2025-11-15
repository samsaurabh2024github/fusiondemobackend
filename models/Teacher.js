// import mongoose from "mongoose";

// const teacherSchema = new mongoose.Schema({
//   schoolId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "School",
//     required: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   sports: {
//     type: String,
//     required: true
//   }
// });

// const Teacher = mongoose.model("Teacher", teacherSchema);
// export default Teacher;



import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sports: {
    type: String,
    required: true
  },
  assignedClasses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class"
    }
  ]
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
