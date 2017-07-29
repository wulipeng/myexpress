/**
 * Created by Administrator on 2017/7/26.
 */
"use strict";
const dbUtil = require("../utils/dbUtil");
var collectionName = "user";
/**
 * 获取用户
 * @param name {String}
 * @param callback {function(err {Error},resultObject {object})}
 * @throws Error
 */
async function getUser(name, callback) {
    var where={name:name};
    var db=await dbUtil.getConnect();
    return db.collection(collectionName).findOne(where,callback);
}
/**
 * 获取所有用户列表
 * @param callback {function(err {Error},resultArray {Array})}
 * @returns {Promise}
 */
async function getList(callback){
    var where={};
    var db=await dbUtil.getConnect();
    return db.collection(collectionName).find().toArray(callback);
}
module.exports = {getUser,getList};