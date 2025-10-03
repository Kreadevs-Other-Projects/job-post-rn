const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  listApplications,
  apply,
} = require("../controllers/applicationController");

router.post("/", upload.single("cv"), apply);

router.get("/", listApplications);

module.exports = router;
