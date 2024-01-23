const express = require("express");
const {
  registerUser,
  loginUser,
  allUsers,
  logoutUser,
  isLogin,
} = require("../controllers/userController");
const {
  getUserApprovals,
  getSpecificUserApproval,
  updateSpecificUserApproval,
} = require("../controllers/approvalController");

const {
  addReviewToPR,
  getAllReviewToPR,
} = require("../controllers/reviewsController");
const { authMiddle, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/islogin", authMiddle, isLogin);
router.post("/", registerUser);
router.get("/search", authMiddle, allUsers);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// get User PR approval requests
router.get(
  "/pull-requests",
  authMiddle,
  authorizeRoles("admin"),
  getUserApprovals
);
router.get(
  "/pull-requests/:id",
  authMiddle,
  authorizeRoles("admin"),
  getSpecificUserApproval
);
router.put(
  "/pull-requests/:id",
  authMiddle,
  authorizeRoles("admin"),
  updateSpecificUserApproval
);

// Give Reviews to PR
router.post("/pull-requests/:id/reviews", authMiddle, addReviewToPR);
// get all reviews of a PR
router.get(
  "/pull-requests/:id/reviews",
  authMiddle,
  authorizeRoles("admin"),
  getAllReviewToPR
);

module.exports = router;
