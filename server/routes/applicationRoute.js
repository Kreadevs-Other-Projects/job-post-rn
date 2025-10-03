const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  listApplications,
  apply,
} = require("../controllers/applicationController");

router.post("/apply", upload.single("cv"), apply);

router.get("/listApplications", listApplications);

module.exports = router;
