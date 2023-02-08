const joi=require('joi');
const username=joi.string().alphanum().max(10).min(1).required();
const password=joi.string().pattern(/^[\S]{6,8}$/).required();
exports.reg_login_schema={
    body: {
        username,
        password,
    }
};
const id=joi.number().integer().min(1).required();
const nickname=joi.string().required();
const email=joi.string().email().required();
exports.update_userinfo_schema={
    body: {
        id,
        nickname,
        email,
    }
};
exports.update_password_schema={
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
const avatar = joi.string().dataUri().required();
exports.update_avatar_schema = {
    body: {
        avatar,
    },
};
 const name = joi.string().required();
 const alias = joi.string().alphanum().required();
 exports.add_cate_schema= {
     body: {
         name,
         alias,
     }
 };

 exports.delete_cate_schema = {
     params: {
         id,
     }
 }

exports.get_cate_schema = {
    params: {
        id,
    }
}
exports.update_cate_schema={
    body: {
        id,
        name,
        alias
    }
}
// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

// 验证规则对象 - 发布文章
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
    },
}