const User = require("../models/userModel");
const Role = require("../models/rolesModel");
const PullRequest = require("../models/pullRequestsModel");
const Approval = require("../models/approvalsModel");

const getUserApprovals = async (req, res) => {
  const userId = req.user._id;
  try {
    let approvals = await Approval.find({ approverId: userId }).populate(
      "pullRequestId", "title description"
    );
    if(approvals===null || approvals=== undefined){
      throw new Error("No PR Approval request");
    }
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
    const approval = await Approval.findById(approvalId).populate("pullRequestId");
    // const { approvers } = await PullRequest.findById(approval.pullRequestId);
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
    if(approval===null || approval==undefined){
      throw new Error("Invalis Id");
    }

    await PullRequest.updateOne(
      { _id: approval.pullRequestId },
      { $set: { "approvers.$[approver].status": status } },
      { arrayFilters: [{ "approver.approverId": userId }] }
    );
    return res.status(200).json({ success: true, approval });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
};

module.exports = {
  getUserApprovals,
  updateSpecificUserApproval,
  getSpecificUserApproval,
};
