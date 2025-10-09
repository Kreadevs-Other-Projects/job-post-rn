const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { validateEmail } = require("../services/validateEmail");
const generateVerificationCode = require("../services/otp");
const { transporter } = require("../services/mail");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid email format",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS || 10));
    const hashed = await bcrypt.hash(password, salt);

    const verificationCode = generateVerificationCode();
    const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

    const mailOptions = {
      from: `"Job Post" <${process.env.EMAIL}>`,
      to: email,
      subject: "Verify Your Account",
      html: `
        <h3>Hello ${name},</h3>
        <p>Your verification code is:</p>
        <h2>${verificationCode}</h2>
        <p>Enter this code in the app to verify your account.</p>
      `,
    };

    console.log(`📧 Sending verification email to: ${email}`);

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

    const user = new User({
      name,
      email,
      password: hashed,
      role,
      profilePic,
      verificationCode,
      isVerified: false,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      status: 201,
      message: "User registered successfully. Verification email sent.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error("❌ Register error:", err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid credentials",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid credentials",
      });

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "Please verify your email first.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("-password");

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  try {
    if (!email || !code) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Email and code are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "User already verified",
      });
    }

    if (user.verificationCode !== Number(code)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid verification code",
      });
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Email verified successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error("Email verification error:", err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Delete user error:", err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  verifyEmail,
  deleteUser,
};
