const express = require('express');
const cors = require('cors');
const joi=require('joi');
const userRouter = require('./router/user');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const config = require('./config');
const expressJWT = require('express-jwt');
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }));

app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        });
    };
    next();
})
app.use('/api', userRouter);
app.use('/api', userRouter);
app.use((err,req,res,next)=>{
    if (err instanceof joi.ValidationError) return res.cc(err);
    res.cc(err);
});

const userinfoRouter=require('./router/userinfo');
app.use('/my', userinfoRouter);

const artCateRouter=require('./router/artcate');
app.use('/my/article', artCateRouter);

const articleRouter=require('./router/article');
app.use('/my/article', articleRouter);

app.use('/uploads', express.static('./uploads'));

app.listen(3006, () => {
    console.log('服务已启动！');
})