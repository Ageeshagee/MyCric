const express=require('express')
const router=express.Router()
const {RegAdmin, login}=require('../controller/controller')
const Middleware=require('../middleware/authmiddleware')
const {adduser}=require('../controller/Admincontroler')



router.post('/adduser',Middleware,adduser)

module.exports=router