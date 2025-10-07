const Application = require("../models/Application");

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  getAllApplications,
  getApplication,
  updateStatus,
  appliedJobs,
  uploadResume,
};
