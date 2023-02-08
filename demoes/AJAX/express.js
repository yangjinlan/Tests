//引入express
const express = require('express');
//创建应用对象
const app = express();
//创建路由规则
app.get('/server',(request, response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send('HELLO EXPRESS');
});

app.all('/jsonp-demo', (request, response) => {
    // response.setHeader("Access-Control-Allow-Origin");
    const data={
        name:'yangjinlan',
        age:24
    }
    let str=JSON.stringify(data);
    response.send(`handle(${str})`);
});
app.all('/jQuery-server', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send('{"name":"yangjinlan"}');
});
//jQuery发送jsonp请求响应
app.all('/jQuery-jsonp-server', (request, response) => {
    const data={
        name:'yangjinlan'
    }
    let cb=request.query.callback;
    let str=JSON.stringify(data);
    response.send(`${cb}(${str})`);
});
//响应Axios
app.all('/Axios-server', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.send('Hello Axios');
});
//响应fetch
app.all('/fetch-server', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.send('Hello fetch');
});
//监听端口
app.listen(8000, ()=>{
    console.log('服务已经启动');
})