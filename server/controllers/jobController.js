const Job = require("../models/Job");

const addJob = async (req, res) => {
  try {
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
      owner,
    } = req.body;

    if (!title || !companyName || !location || !jobType) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Title, company name, location, and job type are required",
      });
    }

    if (!minSalary || !maxSalary) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Expected salary range (min & max) is required",
      });
    }

    const job = new Job({
      title,
      companyName,
      location,
      salary: { min: minSalary, max: maxSalary },
      experience,
      description,
      jobType,
      requirements,
      skills,
      benefits,
      owner,
    });

    await job.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: "Job added successfully",
      job,
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

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No jobs found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      count: jobs.length,
      jobs,
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

const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      job,
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

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      status: 200,
      count: jobs.length,
      jobs,
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

const getWeeklyJobs = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const jobs = await Job.find({ createdAt: { $gte: oneWeekAgo } }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      status: 200,
      count: jobs.length,
      jobs,
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

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const job = await Job.findByIdAndUpdate(id, updatedData, { new: true });

    if (!job)
      return res
        .status(404)
        .json({ success: false, status: 404, message: "Job not found" });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Job updated successfully",
      job,
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

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job)
      return res
        .status(404)
        .json({ success: false, status: 404, message: "Job not found" });

    await job.deleteOne();
    res.status(200).json({
      success: true,
      status: 200,
      message: "Job deleted successfully",
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

const getRecommendedJobs = async (req, res) => {
  try {
    const { skills } = req.query;
    if (!skills)
      return res
        .status(400)
        .json({ success: false, status: 400, message: "Skills required" });

    const skillArray = skills.split(",").map((s) => s.trim());
    const jobs = await Job.find({
      skills: { $in: skillArray },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      status: 200,
      count: jobs.length,
      jobs,
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

const getJobsByOwner = async (req, res) => {
  try {
    const { owner_id } = req.query;

    if (!owner_id) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Owner ID is required",
      });
    }

    const jobs = await Job.find({ owner: owner_id })
      .sort({ createdAt: -1 })
      .populate("owner", "name email role");

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No jobs found for this owner",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      count: jobs.length,
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (err) {
    console.error("Error fetching jobs by owner:", err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server error",
      error: err.message,
    });
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
  getJobsByOwner,
};
