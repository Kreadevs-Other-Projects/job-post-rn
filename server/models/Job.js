const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  expectedSalary: { type: String },
  experience: { type: String },
  description: { type: String },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "remote"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
