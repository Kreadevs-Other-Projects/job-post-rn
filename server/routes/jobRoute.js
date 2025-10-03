const express = require("express");
const {
  addJob,
  listJobs,
  getJob,
  getAllJobs,
  getWeeklyJobs,
} = require("../controllers/jobController");
const router = express.Router();

router.post("/addJob", addJob);
router.get("/listJobs", listJobs);
router.get("/getAllJobs", getAllJobs);
router.get("/weekly", getWeeklyJobs);
router.get("/getJob/:id", getJob);

module.exports = router;
