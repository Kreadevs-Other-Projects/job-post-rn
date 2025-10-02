const express = require("express");
const router = express.Router();
const {
  getAllApplications,
  getApplication,
  updateStatus,
} = require("../controllers/applicationController");

router.get("/", getAllApplications);

router.get("/:id", getApplication);

router.put("/:id", updateStatus);

module.exports = router;
