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

module.exports = router;
