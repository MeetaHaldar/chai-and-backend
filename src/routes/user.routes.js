import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentuser,
  updateAvatar,
  updateCoverImage,
  updateAccountDetails,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", upload, registerUser); // Apply upload middleware first
router.post("/login", loginUser);
// secured routes
router.post("/logout", verifyJWT, logoutUser);
router.post("/refreshToken", refreshAccessToken);
router.post("/changePassword", verifyJWT, changeCurrentPassword);
router.post("/currentUser", verifyJWT, getCurrentuser);
router.patch("/update-avatar", verifyJWT, upload, updateAvatar);
router.patch("/updateCoverImage", verifyJWT, upload, updateCoverImage);
router.patch("/update-account", verifyJWT, updateAccountDetails);
router.get("/c/:username", verifyJWT, getUserChannelProfile);
router.get("/history", verifyJWT, getWatchHistory);

export default router;
