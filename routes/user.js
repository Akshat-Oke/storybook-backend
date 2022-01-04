import express from "express";
import { signupController, signinController } from "../controllers/user.js";
const router = express.Router();

router.post("/signin", signinController);
router.post("/signup", signupController);
export default router;
