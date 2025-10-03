const express = require("express");
const router = express.Router();
const {
  getAllApplications,
  getApplication,
  updateStatus,
  appliedJobs,
} = require("../controllers/applicationController");

router.get("/", getAllApplications);

router.get("/:id", getApplication);

router.put("/:id", updateStatus);

router.get("/applied", appliedJobs);

module.exports = router;
