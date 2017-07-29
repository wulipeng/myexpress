"use strict";
var express = require('express');
var router = express.Router();
var usersService=require("../service/usersService");
var stringUtil=require("../utils/stringUtil");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/**
 * 用户登录，成功将登录态置于Redis
 */
router.post("/login",function(req,res,next){
  if("undefined"==typeof req.body.token ||  req.body.token!=req.session.token){
    res.json({code:1,msg:"token expired"});
    return;
  }
  if(req.session.isLogin){
    res.json({code:1,msg:"已经登录"});
    return;
  }
  usersService.login(req.body).then(resultBoolean=>{
    if(resultBoolean==true){
      req.session.isLogin=true;
      req.session.tokenLocked=true;
      //  准备redis装配
      //  验证verifyToken 用于以后的登录，2小时就行了
      res.cookie("vt",{item:[2,2,2]});//  测试cookie的数组，无实际用处
      res.cookie("verifyToken",stringUtil.randomHex(32,true),{httpOnly:true,maxAge:1000*60*60*2,domain:undefined,path:undefined});
      res.json({code:0,msg:"登录成功",data:{sign:req.cookies.SESSIONKEY}});//  返回session中的数据
    }else{
      res.json({code:1,msg:"账号或密码错误"});
    }
  }).catch(err=>{
    res.json({code:500,msg:err.message});
  });
});
router.post("/getList",function(req,res,next){
  usersService.getList().then(list=>{
    res.json({code:0,msg:"",data:list});
  }).catch(err=>{
    res.json({code:500,msg:err.message});
  });
});
router.post("/logout",function(req,res,next){
  req.session.isLogin=false;
  req.session.tokenLocked=false;
  res.clearCookie("verifyToken");
  res.redirect("/");
});
router.post("/token",function(req,res,next){
  if(req.session.tokenLocked){
    res.json({code:1,msg:"get token error"});
    return;
  }
  req.session.token=stringUtil.randomHex(32,true);
  res.json({code:0,msg:"",data:{token:req.session.token}});
});
module.exports = router;