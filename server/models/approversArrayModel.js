const mongoose = require("mongoose");

const approverArraySchema = new mongoose.Schema(
  {
    pullRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PullRequest",
    },
    levels: [
      {
        level: { type: Number, default: 1 },
        approvers: [
          {
            approverId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              require: true,
            },
            status: {
              type: String,
              enum: ["Pending", "Approved", "Rejected"],
              default: "Pending",
            },
            reviews: { type: String, default: "" },
          },
        ],
        statusoflevel: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ApproverArray = mongoose.model("ApproverArray", approverArraySchema);

module.exports = ApproverArray;
