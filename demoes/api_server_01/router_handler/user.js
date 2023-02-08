const db = require('../db/index');
const bcryptjs = require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('../config');
exports.userReguser = function (req, res) {
    const userinfo = req.body;
    if (!userinfo.username || !userinfo.password) return res.cc('用户名或者用户密码不能为空');
    const sqlStr = 'select * from ev_users where username=?';
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) return res.send({ satus: 1, message: err.message });
        if (results.length > 0) return res.cc('用户名已被使用');
    });
    userinfo.password = bcryptjs.hashSync(userinfo.password, 10);
    const sql = 'insert into ev_users set ?';
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
        if (err) return res.cc(err.message);
        if (results.affectedRows !== 1) return res.cc("注册失败，稍后再试！");
        res.cc('注册成功！',0);
    })
    // res.send("reguser OK");
}
exports.userLogin = function (req, res) {
    const userinfo=req.body;
    const sql='select * from ev_users where username=?';
    db.query(sql, userinfo.username, (err, results)=>{
        if(err) return res.cc(err);
        if(results.length!==1) return res.cc('登陆失败！');
        console.log(results[0].password);
        bcryptjs.compare(userinfo.password, results[0].password, (err,results)=>{
            if(err) return res.cc(err);
            if(!results) return res.cc('登陆失败！');
                const user = { ...results[0], password: '', user_pic: '' };
                const token = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' });
                return res.send({
                    status: 0,
                    message: '登陆成功！',
                    token: 'Bearer ' + token,
                });
            
        });
        
    })
}
