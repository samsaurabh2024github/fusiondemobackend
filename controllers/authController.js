// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "Email already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword, role });

//     res.status(201).json({ message: "User registered successfully", user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(200).json({ message: "Login successful", token, user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };



// controllers/authController.js
import User from "../models/User.js";
import Coach from "../models/Coach.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ========================= REGISTER COACH =========================
export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingCoach = await Coach.findOne({ email });
    if (existingCoach) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const coach = await Coach.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "coach"
    });

    res.status(201).json({
      message: "Coach registered successfully",
      user: {
        _id: coach._id,
        name: coach.name,
        email: coach.email,
        role: coach.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ========================= REGISTER ADMIN =========================
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, adminSecret } = req.body;

    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ message: "Invalid admin secret" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "admin"
    });

    res.status(201).json({
      message: "Admin registered successfully",
      user: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ========================= LOGIN (ADMIN + COACH) =========================
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1️⃣ Check admin table first
//     let user = await User.findOne({ email });

//     // 2️⃣ If not found, check coach table
//     if (!user) {
//       user = await Coach.findOne({ email });
//     }

//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = generateToken(user);

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: { _id: user._id, name: user.name, email: user.email, role: user.role }
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };


// Login (admin or coach)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1 — Try User model first (admin + some coaches)
    let user = await User.findOne({ email });

    // Step 2 — If not found → Try Coach model
    if (!user) {
      user = await Coach.findOne({ email });
      console.log("coach found");
      
    }

    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Step 3 — Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Step 4 — Generate JWT
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};