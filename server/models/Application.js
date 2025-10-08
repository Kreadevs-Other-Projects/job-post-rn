const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String },
  resumeUrl: { type: String },
  status: {
    type: String,
    enum: ["waiting", "cancelled", "interview"],
    default: "waiting",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", ApplicationSchema);
