const express=require('express');
const cors=require('cors');
const userRouter=require('./router/user.js');
const joi=require('joi');
const expressJWT = require("express-jwt");
const config=require('./config');
const userinfoRouter=require('./router/userinfo');
let app=express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
app.use((req, res, next)=>{
    res.cc=function(err,status=1){//status=1表示失败，status=0表示成功
        res.send({
            status,
            //err是Error的实例则返回err.message,否则返回err
            message:err instanceof Error ? err.message : err
        });
    }
        next();
});
app.use(expressJWT({secret: config.jwtSecretKey}).unless({path:[/^\/api\//]}));
app.use('/api', userRouter);
app.use('/my',userinfoRouter);

const artCateRouter=require('./router/artcate');
app.use('/my/article', artCateRouter);

app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError) return res.cc(err);
    if(err.name==='UnauthorizedError') return res.cc('身份验证失败！');
    res.cc(err);
})

const articleRouter=require('./router/article');
app.use('/my/article', articleRouter);
app.listen(3007, ()=>{
    console.log('服务已启动！！');
});
