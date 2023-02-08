const express = require('express');
const regUser = require('../router_handler/user');
const router = express.Router();
const user_handler = require('../router_handler/user');
const reg_login_schema = require('../schema/user');
const expressJoi = require('@escook/express-joi');
router.post('/reguser', expressJoi(reg_login_schema.reg_login_schema), user_handler.regUser);
router.post('/login', expressJoi(reg_login_schema.reg_login_schema), user_handler.login);
module.exports = router;
