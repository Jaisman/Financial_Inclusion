import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = "mysecretkey";
import crypto from "crypto";

export async function handleUserSignUp(req, res) {
    try {
        const { name, email, password,phoneNumber} = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            phoneNumber,
            password: secPass,
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

export async function handleUserLogin(req,res) {

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credetials"});
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credetials"});
        }
        const data = {
            user:{
              id : user.id,
            }
        }
        const authToken = jwt.sign(data,secret);
        await res.cookie("token",authToken);
        return res.json({authToken,"id":user._id});
    } 
    catch (error) {
        console.error(error.message);
        res.status(400).send("Internal server error");
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