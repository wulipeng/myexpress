/**
 * Created by Administrator on 2017/7/26.
 */
const redis=require("redis");
const redisCfg=require("../configs/redis");
var client;
//  授权，没有做可不用
//  client.auth("admin");

function getClient(){
    if(!client){
        console.log("创建redis...");
        client=redis.createClient(redisCfg.port,redisCfg.host);
        client.on("error",(error)=>{
            console.log(error);
        });
    }
    return client;
}
module.exports={getClient};
