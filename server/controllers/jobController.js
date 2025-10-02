const Job = require("../models/Job");

exports.addJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      expectedSalary,
      experience,
      description,
    } = req.body;

    if (!title || !companyName || !location) {
      return res
        .status(400)
        .json({ error: "Title, company name, and location are required" });
    }

    const job = new Job({
      title,
      companyName,
      location,
      expectedSalary,
      experience,
      description,
    });

    await job.save();
    res.status(201).json({ message: "Job added successfully", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listJobs = async (req, res) => {
  try {
    const { location, q, companyName } = req.query;
    const filter = {};

    if (location) filter.location = new RegExp(location, "i");
    if (companyName) filter.companyName = new RegExp(companyName, "i");
    if (q) {
      filter.$or = [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { experience: new RegExp(q, "i") },
      ];
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 }).limit(200);

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
