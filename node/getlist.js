// redis 链接
var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');
// redis 链接错误
client.on("error", function (error) {
    console.log(error);
});


exports.getlist = function (req, res, next) { //req, res, next, type
    client.select("0", function (error) {
        if (error) {
            console.log(error);
            next();
        } else {
            client.get("firebase-database", (error, reply) => {
                if (error) {
                    console.log(error);
                    //执行next时代码报错
                    //需要解决原因
                    next();
                } else {
                    var type = req.body.type;
                    //res.send(reply);
                    //res.send(reply);
                    res.send(JSON.parse(reply).lists[type]);
                    // res.send('123');
                };
                //操作完成，关闭redis连接
                //此处需要修改，关闭了连接，第二次访问就会reject请求错误！
                //client.end(true);
            });
        };
    })
}

exports.test = function (req, res, next) {

}