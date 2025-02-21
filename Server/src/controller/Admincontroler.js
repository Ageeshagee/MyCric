const { decrypt } = require("dotenv")
const bcrypt=require('bcryptjs')
const User=require('../models/usermodel')
require("dotenv").config();

exports.adduser= async(req,res)=>{
try{
if(req.user.role=='admin'){
    //res.status(400).json({message:"Access Denied"})
    const {name,email,password,role}=req.body
    const hashedpassword=await bcrypt.hash(password,10)
    const newuser=new User({name,email,password: hashedpassword,role,createdBy:req.user.id})
    await newuser.save()
    res.status(201).json({message:"User Add Suceccfully",user:newuser})
}
}catch(error){
    res.status(500).json({ message: "Server Error", error });
}
}
