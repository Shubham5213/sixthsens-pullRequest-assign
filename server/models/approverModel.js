const mongoose = require("mongoose");

const approvalSchema = new mongoose.Schema(
  {
    pullRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "PullRequest" },
    approverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

const Approval = mongoose.model("Approvar", approvalSchema);

module.exports = Approval;
