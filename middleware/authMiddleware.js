/**
 * Created by Administrator on 2017/7/26.
 */
const redisUtil = require("../utils/redisUtil");
module.exports = function (req, res, next) {
    //  如果是开发环境,不用拦截
    if("development"===req.app.get("env")){
        next();
        return;
    }
    //  没有权限认证的是
    //  没有权限认证的路由: /users/login
    //   白名单
    var blankList = ["/", "/index", "/users/login", "/users/token"].sort();
    for (let i of blankList) {
        if (i == req.url) {
            next();
            return;
        }
    }
    //  检查是否授权
    if (req.session.isLogin) {
        next();
    } else {
        //  判断有无 .
        if (req.url.search(/[a-z]{3,}\.[a-z]{3,}$/) != -1) {
            res.redirect("/");//  判断是个文件，则直接重定向主页面
        } else {
            res.json({code: 403, msg: "auth not pass"});//  如果请求的是方法，则返回 没有授权
        }
    }
};