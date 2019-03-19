var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var jwt = require('./utils/jwt')
var utils = require('./utils/utils')

var index = require('./routes/index');
var users = require('./routes/users');
var cellphone = require('./routes/cellphone');
var push = require('./routes/push');
var admin = require('./routes/admin');



var logDirectory = path.join(__dirname, 'log')
// 确保日志目录存在
// existsSync 以同步的方法检测目录是否存在,存在返回true,不存在返回false
// mkdirSync 以同步的方法创建目录
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// 输出流配置
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
})



var app = express();


app.set('views', path.join(__dirname, 'views'));
// 设置要使用的引擎
app.set('view engine', 'jade');


// 使用bodyParser中间件进行数据解析
// 请求报文类型application/json
app.use(bodyParser.json());
// 请求报文类型application/x-www-form-urlencoded  
// extended: false 'String'或'Array'键值对  true为任何数据类型
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*',function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;chartset=utf-8");
    if (req.method === 'OPTIONS') {
        res.send('Current services support cross domain requests!');
        return;
    }
    next();
});

// 路由拦截
app.use((req, res, next) => {

    if (/admin\/(load|register|exit)/.test(req.url)) {
        next();
    } else  {
        let str = req.headers.authorization;
        if (!str) {
            res.send({status: 500, msg: '当前未登录'});
        }else {
            if(typeof str !== "string") return;
            let token = str.replace(/["']/g,'');
            let result = jwt.verifyToken(token);
            if (result) {
                result == 'err' ? res.send({status: 403, msg: '登录已过期,请重新登录'}) : null;
                option = result;
                next();
            }
        }
    }
});

// 设置logger
app.use(logger((tokens, req, res) => {
    let token = null, result = null;
    if (req.headers.authorization && req.headers.authorization.length > 300) {
        token = req.headers.authorization.replace(/["']/g,'');
        result = jwt.verifyToken(token);
    }
    let user_name = result ? result.data.user_name : "用户不存在";
    let date = utils.curTime(new Date());
    let response = tokens['response-time'](req, res) + 'ms';
        
    return [
        `date:${date}`,
        `user_name:${user_name}`,
        `method:${tokens.method(req, res)}`,
        `url:${tokens.url(req, res)}`,
        `status:${tokens.status(req, res)}`,
        `responseTime:${response}`
    ]
},{stream: accessLogStream}))
// 将静态文件目录设置为项目根目录+/public
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);
app.use('/users', users);
app.use('/cellphone', cellphone);
app.use('/push', push);
app.use('/admin', admin);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
    
module.exports = app;
