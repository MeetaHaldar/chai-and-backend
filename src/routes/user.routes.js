import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
// router.route("/").post((req, res) => {
//   res.send("hello");
// });
// router.route("/loign").post(loginUser);

export default router;
