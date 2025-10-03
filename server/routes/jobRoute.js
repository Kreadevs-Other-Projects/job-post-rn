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
router.get("/:id", getJob);
router.get("/all", getAllJobs);

module.exports = router;
