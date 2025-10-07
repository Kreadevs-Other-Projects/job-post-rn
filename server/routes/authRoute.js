const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  register,
  login,
  getAllUsers,
  verifyEmail,
  deleteUser,
} = require("../controllers/authController");

router.post("/register", upload.single("profilePic"), register);
router.post("/login", login);
router.get("/users", getAllUsers);
router.post("/verifyEmail", verifyEmail);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
