const User = require("../models/userModel");
const Role = require("../models/rolesModel");
const PullRequest = require("../models/pullRequestsModel");
const Approval = require("../models/approvalsModel");

// Create PR
const createPR = async (req, res) => {
  const { title, description, approvers } = req.body;
  try {
    if (!title || !approvers) {
      throw new Error("Enter All the Fields");
    }
    const PRexists = await PullRequest.findOne({ title });
    if (PRexists) {
      throw new Error("Title Exists, Choose Another");
    }

    let PR = {
      title: title,
      description: description,
      requesterId: req.user._id,
      approvers: approvers,
    };

    PR = await PullRequest.create(PR);
    approvers.forEach(async (approver) => {
      await Approval.create({
        pullRequestId: PR._id,
        approverId: approver.approverId,
      });
    });
    return res
      .status(200)
      .json({ success: true, pullRequest: PR });
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

const getAllPR = async (req, res) => {
  try {
    const PR = await PullRequest.find();
    if (!PR) {
      throw new Error("Something Went Wrong!!");
    }
    return res.status(200).json({ success: true, PR });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err: err.message });
  }
};

const getSpecificPR = async (req, res) => {
  const pullRequestId = req.params.id;
  try {
    const PR = await PullRequest.findOne({ _id: pullRequestId });
    if (PR) {
      return res.status(200).json({ success: true, PR });
    } else throw new Error("Invaid ID");
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

const updateSpecificPR = async (req, res) => {
  const pullRequestId = req.params.id;
  const { title, description } = req.body;
  try {
    const PR = await PullRequest.findByIdAndUpdate(
      pullRequestId,
      { title, description },
      { new: true }
    );
    if (PR) {
      return res
        .status(200)
        .json({ success: true, msg: "PR Updated Successfully", PR });
    } else throw new Error("Invaid ID");
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, msg: "Error while deleting" });
  }
};

const deletePR = async (req, res) => {
  const pullRequestId = req.params.id;
  try {
    await PullRequest.findByIdAndDelete(pullRequestId);
    return res
      .status(200)
      .json({ success: true, msg: "PR deleted Successfully" });
  } catch (err) {
    // console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: "Error while deleting" });
  }
};

const getUserCreatedPR = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      throw new Error("Login First");
    }
    let userPR = await PullRequest.find({ requesterId: userId }).populate("approvers.approverId", "username email");
    if (userPR) {
      return res.status(200).json({ success: true, userPR });
    } else throw new Error("Error While Fetching!!");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      msg: err.message,
    });
  }
};

module.exports = {
  createPR,
  getAllPR,
  getUserCreatedPR,
  getSpecificPR,
  updateSpecificPR,
  deletePR,
};
