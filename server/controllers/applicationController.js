const Application = require("../models/Application");

const apply = async (req, res) => {
  try {
    const { name, email, description, job } = req.body;

    if (!name || !email || !job) {
      return res
        .status(400)
        .json({ error: "Name, email, and job are required" });
    }

    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const application = new Application({
      job,
      name,
      email,
      description,
      resumeUrl,
    });

    await application.save();
    return res
      .status(201)
      .json({ succes: true, message: "Application submitted", application });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const listApplications = async (req, res) => {
  try {
    const { job } = req.query;
    const filter = {};
    if (job) filter.job = job;

    const apps = await Application.find(filter)
      .populate("job")
      .sort({ createdAt: -1 });

    return res.json(apps);
  } catch (err) {
    return res.status(500).json({ error: err.message });
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

module.exports = {
  apply,
  listApplications,
  listUserApplications,
};
