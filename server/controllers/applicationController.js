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
      .json({ message: "Application submitted", application });
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

module.exports = {
  apply,
  listApplications,
};
