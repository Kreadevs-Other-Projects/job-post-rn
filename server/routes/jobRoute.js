const express = require("express");
const { addJob, listJobs, getJob } = require("../controllers/jobController");
const router = express.Router();

router.post("/", addJob);
router.get("/", listJobs);
router.get("/:id", getJob);

module.exports = router;
