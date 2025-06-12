import express from "express";
import User from "../models/user.js";
import { handleUserLogin, handleUserLogout, handleUserSignUp } from "../controllers/user.js";

const router = express.Router();

// Create a new user
router.post("/signup",handleUserSignUp);
router.post("/login",handleUserLogin);
router.post("/logout",handleUserLogout);

export default router;  