const express = require("express");
const {
  createPR,
  getAllPR,
  getSpecificPR,
  updateSpecificPR,
  deletePR,
  getUserCreatedPR,
} = require("../controllers/pullRequestController");

const { authMiddle, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// for PR related APIs
router.post("/", authMiddle, createPR);
router.get("/getpr", authMiddle, getUserCreatedPR);
router.get(
  "/getallpr",
  authMiddle,
  authorizeRoles("admin", "moderator"),
  getAllPR
);
router.get("/:id", authMiddle, getSpecificPR);
router.put("/:id", authMiddle, updateSpecificPR);
router.delete("/:id", authMiddle, deletePR);

module.exports = router;
