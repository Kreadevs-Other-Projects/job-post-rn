const express = require("express");
const {
  addJob,
  listJobs,
  getJob,
  getAllJobs,
} = require("../controllers/jobController");
const router = express.Router();

router.post("/", addJob);
router.get("/", listJobs);
router.get("/all", getAllJobs);
router.get("/:id", getJob);

module.exports = router;
