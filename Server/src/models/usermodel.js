const mongoose=require('mongoose')
const Master=require('./masterModel')


const UserSchema= new mongoose.Schema({
    ...Master.obj,
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['admin','student'],required:true}
})
module.exports=mongoose.model('User',UserSchema)