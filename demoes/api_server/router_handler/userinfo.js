const db = require('../db/index');
const bcrypt=require('bcryptjs');
exports.getUserinfo = (req, res) => {
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?';
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取信息失败！');
        res.send({
            status: 0,
            message: '获取信息成功！',
            data: results[0],
        });
    });
};
exports.updateUserinfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?';
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc(err);
        return res.cc('更新成功', 0);
    })
};
exports.updatePassword=(req,res)=>{
    const sql = 'select * from ev_users where id=?';
    db.query(sql, req.user.id, (err, results)=>{//获取客户端token中的id
        if(err) return res.cc(err);
        if(results.length!==1) return res.cc('用户不存在!');
        bcrypt.compare(results[0].password, req.body.oldPwd, (err)=>{
            if (err) return res.cc("原密码错误！");
        });
        const sql='update ev_users set password=? where id=?';
        db.query(sql, [bcrypt.hashSync(req.body.newPwd, 10), req.user.id], (err, results) => {//获取客户端token中的id
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新密码失败！');
            res.cc("更新密码成功！", 0);
        })

    });
};
exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?';
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')

        // 更新用户头像成功
        return res.cc('更新头像成功！', 0)
    })
}
