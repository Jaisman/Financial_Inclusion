import UserFeature from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = "mysecretkey";

export async function handleUserSignUp(req, res) {
    try {
        const { name, email, password,phoneNumber} = req.body;
        
        const existingUser = await UserFeature.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const user = await UserFeature.create({
            name,
            email,
            phoneNumber,
            password,
        });

        const userResponse = { 
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        };

        return res.status(201).json(userResponse); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export async function handleUserLogin(req, res) {
  console.log("Login request body:", req.body);
  const { user_id, password } = req.body;
  try {
    let user = await UserFeature.findOne({ user_id });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    if (password !== user.password) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, secret);
    res.cookie("token", authToken, { httpOnly: true });
    // Return both:
    return res.json({ authToken, userId: user.user_id });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleUserLogout(req,res) {
  try{
    await res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
}
// Fetch all user data
export async function getAllUserData(req, res){
  try {
    const data = await UserFeature.find();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch data by user ID (optional enhancement)
export async function getUserDataById(req, res){
  const { userId } = req.params;
  console.log(userId);
  try {
    const data = await UserFeature.findOne({ user_id: userId });
    if (!data) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching user data by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};