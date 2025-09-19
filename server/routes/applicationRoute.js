const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  listApplications,
  apply,
} = require("../controllers/applicationController");

router.post("/", upload.single("resume"), apply);

// List applications for a job: /api/applications?job=jobId
router.get("/", listApplications);

module.exports = router;
