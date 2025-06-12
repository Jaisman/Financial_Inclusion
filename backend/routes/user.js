import express from "express";
import User from "../models/user.js";
import { handleUserLogin, handleUserLogout, handleUserSignUp, getAllUserData, getUserDataById } from "../controllers/user.js";

const router = express.Router();

// Create a new user
router.post("/signup",handleUserSignUp);
router.post("/login",handleUserLogin);
router.post("/logout",handleUserLogout);
router.get('/getData/:userId', getUserDataById);
router.get('/getAll',getAllUserData);
export default router;  