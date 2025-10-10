const express = require("express");
const {
  addJob,
  listJobs,
  getJob,
  getAllJobs,
  getWeeklyJobs,
  updateJob,
  deleteJob,
  getRecommendedJobs,
  getJobsByOwner,
} = require("../controllers/jobController");
const router = express.Router();

router.post("/addJob", addJob);
router.get("/listJobs", listJobs);
router.get("/getAllJobs", getAllJobs);
router.get("/weekly", getWeeklyJobs);
router.get("/getJob/:id", getJob);
router.get("/recommended", getRecommendedJobs);
router.put("/update/:id", updateJob);
router.delete("/delete/:id", deleteJob);
router.get("/getJobsByOwner", getJobsByOwner); // fetch jobs by owner_ids

module.exports = router;
