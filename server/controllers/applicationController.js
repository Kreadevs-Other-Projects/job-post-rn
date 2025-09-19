const Application = require("../models/Application");

exports.apply = async (req, res) => {
  try {
    const { name, email, job } = req.body;
    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const application = new Application({ name, email, job, resumeUrl });
    await application.save();
    return res.status(201).json(application);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.listApplications = async (req, res) => {
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
