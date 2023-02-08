const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
//注册处理函数
exports.regUser = (req, res) => {
    //接受表单数据进行校验
    const userinfo = req.body;
    // if (!userinfo.username || !userinfo.password) return res.cc("用户名或者用户密码不能为空"); 
    //数据库查重操作
    const sqlStr = 'select * from ev_users where username=?';
    db.query(sqlStr, userinfo.username, (err, results) => {
        //SQL语句执行失败
        if (err) return res.cc(err);
        //用户名被占用
        if (results.length > 0) return res.cc("用户名被占用，请更换其他用户名!");
        userinfo.password = bcrypt.hashSync('userinfo.password', 10);
        const sql = 'insert into ev_users set ?';
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc("注册失败，请稍后再试！");
            res.cc('注册成功！', 0);
        })
    });
}

//登录处理函数
exports.login = ((req, res) => {
    const userinfo = req.body;
    const sql = 'select * from ev_users where username=?';
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('登录失败！');
        bcrypt.compare(userinfo.password, results[0].password, (err, result)=>{
            if(err) return res.cc(err);
        });
        const user = { ...results[0], password: '', user_pic: '' };
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' });
        res.send({
            status: 0,
            message: '登陆成功！',
            token: 'Bearer ' + tokenStr
        })
    });
})