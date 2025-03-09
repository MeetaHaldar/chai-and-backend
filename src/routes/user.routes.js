import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", upload, registerUser); // Apply upload middleware first
router.post("/login", loginUser);
// secured routes
router.post("/logout", verifyJWT, logoutUser);
router.post("/refreshToken", refreshAccessToken);

export default router;
