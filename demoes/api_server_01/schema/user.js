const joi = require('joi');
const username = joi.string().alphanum().min(1).max(10).required();
// 密码的验证规则
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required();
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

exports.update_password_schema = {
    body: {
        // 使用 password 这个规则，验证 req.body.oldPwd 的值
        oldPwd: password,
        // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
        // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}

exports.update_avatar_schema={
    body:{
        // dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
        avatar: joi.string().dataUri().required()
    }
}

const name=joi.string().required();
const alias=joi.string().alphanum().required();
exports.add_cate_schema={
    body: {
        name,
        alias,
    }
}

exports.delete_cate_schma={
    params: {
        id,
    }
}
exports.get_cate_schema = {
    params: {
        id,
    }
}

exports.update_cate_schema=(req,res)=>{
    body: {
        id,
        name,
        alias
    }
}

const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow(' ');
const state= joi.string().valid('已发布','草稿').required();
exports.add_article_schema=(req,res)=>{
    body: {
        title, 
        cate_id,
        content,
        state

    }
}