/**
 * Created by Administrator on 2017/7/26.
 */
    "use strict";
const mongodb=require("mongodb");
const mongodbCfg=require("../configs/mongodb");
var db;//  Promise(Db)
/**
 * 获取连接
 * @return {Promise(Db)}
 */
async function getConnect(){
    if(!db) {
        console.log("mongoClient创建对象");
        db = await(new mongodb.MongoClient()).connect(mongodbCfg.url, {});
    }
    return db;
}
/**
 * 关闭连接,并设置db为null
 */
function closeConnect(){
    if(db){
        db.then(result=>{result.close();db=null});
    }
}
module.exports={getConnect,closeConnect};