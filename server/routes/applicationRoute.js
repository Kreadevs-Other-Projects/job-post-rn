const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  apply,
  listApplications,
  listUserApplications,
} = require("../controllers/applicationController");

router.post("/apply", upload.single("cv"), apply);

router.get("/listApplications", listApplications);
router.post("/userApplications", listUserApplications);

module.exports = router;
