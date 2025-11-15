// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["coach", "admin"], default: "coach" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email:{type:String, required:true, unique:true},
  password:{type:String, required:true},
  role:{type:String, enum:['coach','admin'], default:'coach'},
  phone:String,
  school:{ type: mongoose.Schema.Types.ObjectId, ref: "School" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
