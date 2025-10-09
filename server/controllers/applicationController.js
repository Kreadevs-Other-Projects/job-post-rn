const Application = require("../models/Application");
const Job = require("../models/Job");

const apply = async (req, res) => {
  try {
    const { name, email, description, job_id } = req.body;

    if (!name || !email || !job_id) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and job ID are required",
      });
    }

    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const application = new Application({
      job_id,
      name,
      email,
      description,
      resumeUrl,
    });

    await application.save();
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

const listApplications = async (req, res) => {
  try {
    const { job_id } = req.query;
    const filter = {};
    if (job_id) filter.job_id = job_id;

    const apps = await Application.find(filter)
      .populate("job_id")
      .sort({ createdAt: -1 });

    if (apps.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applications found",
      });
    }

    return res.status(200).json({
      success: true,
      count: apps.length,
      apps,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

const listUserApplications = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });

    const apps = await Application.find({ email })
      .populate("job_id")
      .sort({ createdAt: -1 });

    if (apps.length === 0)
      return res.status(404).json({
        success: false,
        message: "No applications found for this user",
      });

    return res.status(200).json({ success: true, count: apps.length, apps });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job_id")
      .sort({ createdAt: -1 });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applications found",
      });
    }

    res.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const getApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const app = await Application.findById(id).populate("job_id");
    if (!app)
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });

    res.json({ success: true, app });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["waiting", "cancelled", "interview"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const app = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("job_id");

    if (!app)
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });

    res.json({
      success: true,
      message: "Status updated successfully",
      application: app,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    const resumeUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, message: "Resume uploaded", resumeUrl });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const listOfficeApplications = async (req, res) => {
  try {
    const { owner_id } = req.query;

    if (!owner_id) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Owner ID (office) is required",
      });
    }

    const jobs = await Job.find({ owner: owner_id }).select(
      "_id title companyName"
    );

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No jobs found for this office",
      });
    }

    const jobIds = jobs.map((j) => j._id);
    const applications = await Application.find({ job_id: { $in: jobIds } })
      .populate("job_id")
      .sort({ createdAt: -1 });

    if (applications.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No applicants found for this office's jobs",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      totalJobs: jobs.length,
      totalApplications: applications.length,
      jobs,
      applications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  apply,
  listApplications,
  listUserApplications,
  getAllApplications,
  getApplication,
  updateStatus,
  uploadResume,
  listOfficeApplications,
};
