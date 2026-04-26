const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// protected routes
router.post("/", auth, createJob);
router.get("/", auth, getJobs);
router.put("/:id", auth, updateJob);
router.delete("/:id", auth, deleteJob);

module.exports = router;