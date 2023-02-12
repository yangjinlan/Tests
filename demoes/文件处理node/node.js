// const fs = require('fs');
// fs.stat('node.js', (err, result) => {
//     console.log(result.isDirectory());
// });
// fs.mkdir('mkdir', (err) => {
//     console.log('成功');
// });
// fs.writeFile('mkdir/first.txt', 'yes', (err) => {
//     if (err) throw err;
// })
// fs.readdir('mkdir', (err, result) => {
//     console.log(result);
// })
// fs.readFile('mkdir/first.txt', (err, data) => {
//     console.log(data.toString());
// })
// fs.exists('mkdir/first.txt', (data) => {
//     console.log(data + '90')
// });
const http = require('http');
let app = http.createServer();
app.listen(8080);
app.on('request', (req, res) => {
        if (req.url === '/index.html' || req.url === '/'){
            res.writeHead(302, {
                Location: 'https://www.baidu.com/'
            });
            console.log(req.url);
        }
        res.write('this is my');
        res.end();
})
console.log('node');