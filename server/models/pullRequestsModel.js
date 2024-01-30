const mongoose = require("mongoose");

const pullRequestSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String },
    requesterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approversArrayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApproverArray",
    },
    currentLevel: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const PullRequest = mongoose.model("PullRequest", pullRequestSchema);

module.exports = PullRequest;
