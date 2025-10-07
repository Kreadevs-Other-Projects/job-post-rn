const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  salary: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  experience: { type: String },
  description: { type: String },
  requirements: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "remote", "internship"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
