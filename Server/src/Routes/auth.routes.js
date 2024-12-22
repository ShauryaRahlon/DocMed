import express from "express"
import { signUp, login, verifyOTP } from "../Controllers/auth_controller.js"

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.post("/verifyOTP", verifyOTP)

export default router;