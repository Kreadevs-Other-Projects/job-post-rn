const Job = require("../models/Job");

const addJob = async (req, res) => {
  try {
    console.log("Received job data:", req.body); // 👈 Debug log

    const {
      title,
      companyName,
      location,
      minSalary,
      maxSalary,
      experience,
      description,
      jobType,
      requirements,
      skills,
      benefits,
    } = req.body;

    if (!title || !companyName || !location || !jobType) {
      return res.status(400).json({
        error: "Title, company name, location, and job type are required",
      });
    }

    if (!minSalary || !maxSalary) {
      return res
        .status(400)
        .json({ error: "Expected salary range (min & max) is required" });
    }

    const job = new Job({
      title,
      companyName,
      location,
      salary: {
        min: minSalary,
        max: maxSalary,
      },
      experience,
      description,
      jobType,
      requirements,
      skills,
      benefits,
    });

    await job.save();

    res.status(201).json({
      message: "Job added successfully",
      job,
    });
  } catch (err) {
    console.error("Error in addJob:", err.message); // 👈 Add detailed error log
    res.status(500).json({ error: err.message });
  }
};


const listJobs = async (req, res) => {
  try {
    const { location, q, companyName, jobType } = req.query;
    const filter = {};

    if (location) filter.location = new RegExp(location, "i");
    if (companyName) filter.companyName = new RegExp(companyName, "i");
    if (jobType) filter.jobType = jobType;
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

const getJob = async (req, res) => {
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

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getWeeklyJobs = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const jobs = await Job.find({ createdAt: { $gte: oneWeekAgo } }).sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const job = await Job.findByIdAndUpdate(id, updatedData, { new: true });

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.status(200).json({ message: "Job updated successfully", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) return res.status(404).json({ error: "Job not found" });

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecommendedJobs = async (req, res) => {
  try {
    const { skills } = req.query;
    if (!skills) return res.status(400).json({ error: "Skills required" });

    const skillArray = skills.split(",").map((s) => s.trim());
    const jobs = await Job.find({
      skills: { $in: skillArray },
    }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addJob,
  listJobs,
  getJob,
  getAllJobs,
  getWeeklyJobs,
  updateJob,
  deleteJob,
  getRecommendedJobs,
};
