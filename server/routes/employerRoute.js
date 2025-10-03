const express = require("express");
const router = express.Router();
const {
  getAllApplications,
  getApplication,
  updateStatus,
  appliedJobs,
} = require("../controllers/employerController");

router.get("/getAllApplications", getAllApplications);

router.get("/appliedJobs", appliedJobs);

router.get("/getApplication/:id", getApplication);

router.put("/updateStatus/:id", updateStatus);

module.exports = router;
