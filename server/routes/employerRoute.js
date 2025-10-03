const express = require("express");
const router = express.Router();
const {
  getAllApplications,
  getApplication,
  updateStatus,
  appliedJobs,
} = require("../controllers/employerController");

router.get("/", getAllApplications);

router.get("/applied", appliedJobs);

router.get("/:id", getApplication);

router.put("/:id", updateStatus);

module.exports = router;
