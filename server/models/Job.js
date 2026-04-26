const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    location: String,
    applyDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Rejected", "Selected"],
      default: "Applied",
    },
    jobLink: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);