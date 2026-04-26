const Job = require("../models/Job");

// CREATE JOB
exports.createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      userId: req.user.id,
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL JOBS 
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE JOB
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!job) return res.status(404).json({ msg: "Job not found" });

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE JOB
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!job) return res.status(404).json({ msg: "Job not found" });

    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};