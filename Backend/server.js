const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mern-auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
 .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});
// hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

// ✅ Register Route
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, email, password, role });
    await user.save();
    res.json({ message: "✅ Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "❌ Registration failed", error: err.message });
  }
});

// ✅ Login Route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "❌ Login failed", error: err.message });
  }
});

const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api", uploadRoutes);


app.listen(5000, () => console.log("🚀 Server running on port 5000"));
