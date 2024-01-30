const mongoose = require("mongoose");

const approvalSchema = new mongoose.Schema(
  {
    pullRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "PullRequest" },
    approverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    level: { type: Number },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Approval = mongoose.model("Approval", approvalSchema);

module.exports = Approval;
