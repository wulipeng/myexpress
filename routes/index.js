"use strict";
const express = require('express');
var router = express.Router();
const stringUtil = require("../utils/stringUtil");


/* GET home page. */
router.get('/', function (req, res, next) {
    res.end("<html><head><meta charset='utf-8'/></head><body><h1>Hello! Express</h1><a href='/view'>查看设备信息</a><br/><a href='/download'>下载</a><br/><a href='/file'>sendFile</a><br/><form action='users/login' method='post'>username:<input type='text' name='name' value='admin'/><br/>password:<input type='password' name='password' value='admin'/><br/><input type='submit' value='登录' /> </form></body></html>");
});
router.get("/test", function (req, res, next) {
    //  param()  参数获取流程 :param->body->query
    res.json({code: 0, msg: "", data: {pk: stringUtil.randomStr(43) + "=",pk2:stringUtil.randomHex(32,true)}});
});
router.get("/format",function(req,res,next){
    res.format({
        "text/plain": function () {
            res.send("text")
        },
        "application/json": function () {
            res.jsonp({type: "json"})
        },
        "text/html": function () {
            res.send("<html><script>alert('hello');</script></html>")
        },
        "default": function () {
            res.send("default text");
        }
    });
});
router.get("/file",function(req,res,next){
    var options={
        root:__dirname+"/../public/",
        dotfiles:"deny",
        headers:{
            test:"this test header field"
        }
    };
    res.sendFile("/images/default.jpg",options,function(error){
        console.log("发送完结果",error);
        if(error){
            res.json({code:500,msg:error.message});
        }
    });
});
router.get("/download",function(req,res,next){
    res.download(__dirname+"/../public/images/default.jpg","stream.jpg",function(error){
        if(error){
            res.json({code:500,msg:error.message});
        }
    });
});
/**
 * 最开始执行
 */
router.param(function (param, option) {
    console.log("冒号参数Before=", param, "选项=", option);
    return function (req, res, next, value) {
        if (param instanceof Array && param.indexOf(value) || param == value) {
            next();
        } else {
            res.sendStatus(403);
        }
    }
});
router.param(["name", "id"], function (req, res, next, value) {
    //  这里是拦截 冒号参数
    console.log("请求的参数Before", value);
    next();
});
router.get("/restful/:name/:age", function (req, res, next) {
    //  获取 冒号参数 的方法
    //  1.req.param
    //  2.req.params
    res.json(req.params);
});
router.get("/buffer",function(req,res,next){
    //  测试Buffer数据
    //var buffer=new Buffer(16);
    //var buffer=Buffer.alloc(16,1);
    //var buffer=Buffer.allocUnsafe(16);//  此处生成的Buffer内容不一定，但是速度很快
    //var buffer=Buffer.from("abcdefg","utf-8");
    //var buffer=Buffer.from([1,2,3,4,5]);
    var buffer=Buffer.alloc(256);
    for(let i=0;i<buffer.length;i++){
        buffer[i]=i;
    }
    var outBuffer="{"+buffer.join(",")+"}";
    console.log(outBuffer);
    res.end(buffer);
});
module.exports = router;