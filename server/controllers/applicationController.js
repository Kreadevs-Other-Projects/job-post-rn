const Application = require("../models/Application");

const apply = async (req, res) => {
  try {
    const { name, email, description, job_id } = req.body;

    if (!name || !email || !job_id) {
      return res
        .status(400)
        .json({ error: "Name, email, and job ID are required" });
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
    return res
      .status(201)
      .json({ success: true, message: "Application submitted", application });
  } catch (err) {
    return res.status(500).json({ error: err.message });
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
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const listUserApplications = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const apps = await Application.find({ email })
      .populate("job")
      .sort({ createdAt: -1 });

    if (apps.length === 0)
      return res.json({ message: "No applications found for this user" });

    return res.json(apps);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job_id")
      .sort({ createdAt: -1 });

    if (!applications || applications.length === 0) {
      console.warn("⚠ No applications found.");
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
    console.error(err);
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const app = await Application.findById(id).populate("job");
    if (!app) return res.status(404).json({ error: "Application not found" });

    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["waiting", "cancelled", "interview"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const app = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("job");

    if (!app) return res.status(404).json({ error: "Application not found" });

    res.json({ message: "Status updated", application: app });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const appliedJobs = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const applications = await Application.find({ email })
      .populate("job")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const resumeUrl = `/uploads/${req.file.filename}`;
    res.json({ message: "Resume uploaded", resumeUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  apply,
  listApplications,
  listUserApplications,
  getAllApplications,
  getApplication,
  updateStatus,
  appliedJobs,
  uploadResume,
};
