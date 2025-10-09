const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  apply,
  listApplications,
  listUserApplications,
  getAllApplications,
  getApplication,
  updateStatus,
  listOfficeApplications,
} = require("../controllers/applicationController");

router.post("/apply", upload.single("file"), apply);

router.get("/listApplications", listApplications); //this route display posted jobs and the number of applicant applied
router.post("/userApplications", listUserApplications); // this route display the applicant applied on a jobs

router.get("/getAllApplications", getAllApplications);

router.get("/getApplication/:id", getApplication);

router.put("/updateStatus/:id", updateStatus);

router.get("/listOfficeApplications/:id", listOfficeApplications);

module.exports = router;
