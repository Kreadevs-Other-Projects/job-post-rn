const Job = require("../models/Job");

exports.addJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listJobs = async (req, res) => {
  try {
    const { category, location, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (location) filter.location = location;
    if (q)
      filter.$or = [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
      ];

    const jobs = await Job.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id).populate(
      "owner",
      "name email"
    );
    if (!prop) return res.status(404).json({ message: "Property not found" });
    res.json(prop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listProperties = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;
    const filter = {};
    if (q)
      filter.$or = [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { location: new RegExp(q, "i") },
      ];
    if (category) filter.category = category;
    if (minPrice)
      filter.price = { ...(filter.price || {}), $gte: Number(minPrice) };
    if (maxPrice)
      filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };

    const props = await Property.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(props);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
