const User = require("../models/userModel");
const Role = require("../models/rolesModel");
const PullRequest = require("../models/pullRequestsModel");
const Approval = require("../models/approvalsModel");
const Review = require("../models/reviewsModel");

const addReviewToPR = async (req, res) => {
  const userId = req.user._id;
  const prId = req.params.id;
  const { reviews } = req.body;
  try {
    const review = await Review.create({
      pullRequestId: prId,
      reviews,
    });

    await PullRequest.updateOne(
      { _id: prId },
      { $set: { "approvers.$[approver].reviews": reviews } },
      { arrayFilters: [{ "approver.approverId": userId }] }
    );
    return res.status(200).json({ success: true, review });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

const getAllReviewToPR = async (req, res) => {
  const prId = req.params.id;
  const userId = req.user._id;

  try {
    let { approvers } = await PullRequest.findById(prId).populate(
      "approvers.approverId",
      "username email"
    );

    // approvers = approvers.filter((ap) => ap.approverId._id != userId);
    return res.status(200).json({ success: true, userId, approvers });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ success: false });
  }
};

module.exports = { addReviewToPR, getAllReviewToPR };
