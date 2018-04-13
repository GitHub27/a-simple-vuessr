var express = require('express');
var app = express();
var router = express.Router();
var logger = require('morgan');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');

//在终端打印日志
app.use(logger('dev'));

//>>>>>一天一个日志文件<<<<<
//设置日志文件目录
var logDirectory = __dirname + '/logs';
//确保日志文件目录存在 没有则创建
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//创建一个写路由
var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/accss-%DATE%.log',
    frequency: 'daily',
    verbose: false
})

app.use(logger('combined', { stream: accessLogStream }));//写入日志文件


// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function (req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function (req, res, next) {
    // ... maybe some additional /bar logging ...
    console.log('bar>>>')
    next();
});

// always invoked
router.use(function (req, res, next) {
    res.send('Hello World');
});

app.use(router);

app.listen(3000);