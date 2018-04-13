var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app=express();

//将post请求参数
// parses x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// 该路由使用的中间件
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });

// 定义网站主页的路由
router.get('/', function (req, res) {
    res.send('Birds home page');
});

//获取新闻列表
router.post("/getlist", (req, res, next) => {
  const obj = require("../getlist.js");
  obj.getlist(req, res, next);
});



module.exports = router;