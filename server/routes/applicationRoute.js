const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  listApplications,
  apply,
  appliedJobs,
} = require("../controllers/applicationController");

router.post("/", upload.single("cv"), apply);

router.get("/", listApplications);

router.get("/applied", appliedJobs);

module.exports = router;
