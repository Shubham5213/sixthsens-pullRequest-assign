const User = require("../models/userModel");
const Role = require("../models/rolesModel");
const PullRequest = require("../models/pullRequestsModel");
const Approval = require("../models/approvalsModel");
const Review = require("../models/reviewsModel");
const ApproverArray = require("../models/approversArrayModel");

const addReviewToPR = async (req, res) => {
  const userId = req.user._id;
  const prId = req.params.id;
  const { reviews } = req.body;
  try {
    const review = await Review.create({
      pullRequestId: prId,
      userId,
      reviews,
    });
    let approval = await Approval.findOne({
      pullRequestId: prId,
      approverId: userId,
    });

    await ApproverArray.updateOne(
      { pullRequestId: prId },
      { $set: { "levels.$[level].approvers.$[approver].reviews": reviews } },
      {
        arrayFilters: [
          { "level.level": approval.level },
          { "approver.approverId": userId },
        ],
      }
    );
    return res.status(200).json({ success: true, review });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

const getAllReviewToPR = async (req, res) => {
  const prId = req.params.id;
  const userId = req.user._id;

  try {
    let reviews = await Review.find({ pullRequestId: prId }).populate("userId","username email");
    return res.status(200).json({ success: true, reviews });
  } catch (e) {
    // console.log(e);
    return res.status(400).json({ success: false, error: e.message });
  }
};

// level wise get Reviews
// const getAllReviewToPR = async (req, res) => {
//   const prId = req.params.id;
//   const userId = req.user._id;

//   try {
//     // console.log(prId);
//     let approval = await Approval.findOne({
//       pullRequestId: prId,
//       approverId: userId,
//     });

//     if (approval === null || approval === undefined) {
//       throw new Error("Invalid PR ID");
//     }

//     let approvers = await ApproverArray.findOne(
//       { pullRequestId: prId },
//       { levels: { $elemMatch: { level: approval.level } } }
//     );

//     approvers = approvers.levels[0].approvers;

//     const resp = [];
//     for (const ap of approvers) {
//       if (JSON.stringify(ap.approverId) !== JSON.stringify(userId)) {
//         let data = await User.findById(ap.approverId);
//         let a = {
//           userId: ap.approverId,
//           username: data.username,
//           email: data.email,
//           reviews: ap.reviews,
//         };
//         resp.push(a);
//       }
//     }

//     if (approvers === null || approvers === undefined) {
//       throw new Error("Invalid PR Id");
//     }

//     return res.status(200).json({ success: true, resp });
//   } catch (e) {
//     console.log(e);
//     return res.status(400).json({ success: false });
//   }
// };

module.exports = { addReviewToPR, getAllReviewToPR };
