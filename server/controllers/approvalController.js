const User = require("../models/userModel");
const Role = require("../models/rolesModel");
const PullRequest = require("../models/pullRequestsModel");
const Approval = require("../models/approvalsModel");
const ApproverArray = require("../models/approversArrayModel");

const getUserApprovals = async (req, res) => {
  const userId = req.user._id;
  try {
    let approvals = await Approval.find({ approverId: userId }).populate(
      "pullRequestId",
      "title description currentLevel"
    );
    if (approvals === null || approvals === undefined) {
      throw new Error("No PR Approval request");
    }
    approvals = approvals.filter((ap) => {
      return ap.level <= ap.pullRequestId.currentLevel;
    });
    return res.status(200).json({ success: true, approvals });
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

const getSpecificUserApproval = async (req, res) => {
  const approvalId = req.params.id;
  try {
    if (approvalId === null || approvalId === undefined) {
      throw new Error("Invalid Id");
    }
    const approval = await Approval.findById(approvalId).populate(
      "pullRequestId"
    );
    // const { approvers } = await    PullRequest.findById(approval.pullRequestId);
    return res.status(200).json({
      success: true,
      approval,
    });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
};

const updateSpecificUserApproval = async (req, res) => {
  const userId = req.user._id;
  const approvalId = req.params.id;
  const { status } = req.body;
  try {
    if (!status || !approvalId) {
      throw new Error("Invalid request");
    }
    const approval = await Approval.findByIdAndUpdate(
      approvalId,
      { status },
      { new: true }
    );
    if (approval === null || approval == undefined) {
      throw new Error("Invalid Approval Id");
    }

    let PR = await PullRequest.findById(approval.pullRequestId);
    const approversArrayId = PR.approversArrayId;
    const approvalLevel = approval.level;
    const approverId = approval.approverId;

    let approverArray = await ApproverArray.findOneAndUpdate(
      { _id: approversArrayId },
      { $set: { "levels.$[level].approvers.$[approver].status": "Approved" } },
      {
        arrayFilters: [ 
          { "level.level": approvalLevel },
          { "approver.approverId": approverId },
        ],
        new: true,
      }
    );

    for (let level of approverArray.levels) {
      let approvedCount = 0;
      for (let approver of level.approvers) {
        if (approver.status === "Approved") {
          approvedCount++;
        }
      }
      let approvedRatio = approvedCount / level.approvers.length;
      if (approvedRatio > 0.7) {
        level.statusoflevel = "Approved";
      }
    }
    await ApproverArray.updateOne({ _id: approversArrayId }, approverArray);

    let currentLevel;
    let doc = await ApproverArray.findByIdAndUpdate(approversArrayId, {
      sort: { "levels.level": 1 },
    });
    for (let level of doc.levels) {
      if (level.statusoflevel === "Pending") {
        currentLevel = level.level;
        break;
      } else {
        currentLevel = -1;
      }
    }

    await PullRequest.findByIdAndUpdate(PR._id, { currentLevel: currentLevel });

    return res.status(200).json({ success: true, approverArray });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
};

module.exports = {
  getUserApprovals,
  updateSpecificUserApproval,
  getSpecificUserApproval,
};
