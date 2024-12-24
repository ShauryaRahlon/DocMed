import express from "express"
import { signUp, login, verifyOTP, aiHandle } from "../Controllers/auth_controller.js"
import upload from "../Utils/multer.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.post("/verifyOTP", verifyOTP)

router.post('/caption', aiHandle)

export default router;