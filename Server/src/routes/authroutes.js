const express=require('express')
const router=express.Router()
const {RegAdmin,login}=require('../controller/controller')

router.post('/register',RegAdmin)
router.post('/login',login)

module.exports=router
