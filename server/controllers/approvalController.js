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
    return res.status(200).json({ success: true, approvals });
  } catch (err) {
    return res.status(401).json({ success: false, msg: err.message });
  }
};

const getSpecificUserApproval = async (req, res) => {
  const approvalId = req.params.id;

  try {
    const approval = await Approval.findById(approvalId).populate("pullRequestId");
    // const { approvers } = await PullRequest.findById(approval.pullRequestId);
    return res.status(200).json({
      success: true,
      approval,
    });
  } catch (err) {
    return res.status(401).json({ success: false, msg: err.message });
  }
};

const updateSpecificUserApproval = async (req, res) => {
  const userId = req.user._id;
  const approvalId = req.params.id;
  const { status } = req.body;
  try {
    const approval = await Approval.findByIdAndUpdate(
      approvalId,
      { status },
      { new: true }
    );

    await PullRequest.updateOne(
      { _id: approval.pullRequestId },
      { $set: { "approvers.$[approver].status": status } },
      { arrayFilters: [{ "approver.approverId": userId }] }
    );
    return res.status(200).json({ success: true, approval });
  } catch (err) {
    return res.status(401).json({ success: false, msg: err.message });
  }
};

module.exports = {
  getUserApprovals,
  updateSpecificUserApproval,
  getSpecificUserApproval,
};
