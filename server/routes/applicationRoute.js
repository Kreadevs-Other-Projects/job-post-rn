const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  apply,
  listApplications,
  listUserApplications,
  getAllApplications,
  getApplication,
  updateStatus,
  appliedJobs,
} = require("../controllers/applicationController");

router.post("/apply", upload.single("file"), apply);

router.get("/listApplications", listApplications);
router.post("/userApplications", listUserApplications);

router.get("/getAllApplications", getAllApplications);

router.get("/appliedJobs", appliedJobs);

router.get("/getApplication/:id", getApplication);

router.put("/updateStatus/:id", updateStatus);

module.exports = router;
