import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/register", upload, registerUser); // Apply upload middleware first

export default router;
