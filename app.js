var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require("express-session");
var sessionCfg=require("./configs/session");

var headerMiddleware=require("./middleware/headerMiddleware");
var authMidlleware=require("./middleware/authMiddleware");
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//  设置app属性
app.set("jsonp callback name","callback");//  jsonp callback的名字
app.set("env","development");//  开发环境

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionCfg));//  session
app.use(express.static(path.join(__dirname, 'public')));

//  请求头拦截
app.use(headerMiddleware);
//  权限拦截
app.use(authMidlleware);
app.use('/', index);
app.use('/users', users);
//  直接自定义地址

//  链式路由某一地址，并以不同方式处理
app.route("/view").all(function (req, res, next) {
  console.log("all");
  next();
}).get(function (req, res, next) {
  console.log(res.headersSent);//  false
  res.status(200);
  console.log(res.headersSent);//  true
  res.json({protocol: req.protocol,path:req.path,secure:req.secure,hostname: req.hostname, subdomains:req.subdomains,originalUrl:req.originalUrl,ip: req.ip, ips: req.ips,xhr:req.xhr});
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
