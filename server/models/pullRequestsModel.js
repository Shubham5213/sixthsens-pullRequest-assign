const mongoose = require("mongoose");

const pullRequestSchema = new mongoose.Schema(
  {
    title: { type: String, uqnique: true },
    description: { type: String },
    requesterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvers: [
      {
        approverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
        // reviews: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
        reviews: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const PullRequest = mongoose.model("PullRequest", pullRequestSchema);

module.exports = PullRequest;
