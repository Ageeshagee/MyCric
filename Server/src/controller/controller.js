const User = require('../models/usermodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
exports.RegAdmin = async (req, res) => {
    try {
        
        const { name, email, password, role, createdBy } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All Fields are Required" });
        }

        if (role === 'admin' && !createdBy) {
            return res.status(400).json({ message: "createdBy is required for admin" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            createdBy: createdBy || null
        });

        await user.save();
        res.status(201).json({ message: "User Registered Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.login=async(req,res)=>{
    try{
        console.log("hello")
const {email,password}=req.body;
console.log(req.body)
const user=await User.findOne({email})
if (!email || !password) {
    return res.status(400).json({ message: "All Fields are Required" })
}
if(!user){
    return res.satus(400).json({message:"User Not Found"})
}
const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch){
    return res.status(400).json({message:"Passwors missmatch"})
}
const token=jwt.sign({
    id:user._id,
    role:user.role,
    email:user.email
},
process.env.JWT_SECRET,
{ expiresIn: "1h" }
);
console.log(token)
// res.status(200).json({message:token});
res.status(200).json({message:"Log in Sucess",token,role:user.role,})
    }
    catch(error){
        res.status(500).json({ message: "Server Error", error })
    }
}