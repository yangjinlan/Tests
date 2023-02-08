const express=require('express');
const expressJoi=require('@escook/express-joi');
const {reg_login_schema}=require('../schema/user');
const user_handler=require('../router_handler/user');
const router=express.Router();
router.post('/reguser', expressJoi(reg_login_schema),user_handler.userReguser);
router.post('/login', user_handler.userLogin);
module.exports=router;