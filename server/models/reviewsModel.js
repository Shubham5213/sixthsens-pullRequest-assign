const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    pullRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "PullRequest" },
    reviews: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
