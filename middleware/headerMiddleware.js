/**
 * Created by Administrator on 2017/7/27.
 */
module.exports=function(req,res,next){
    var ua=req.get("User-Agent");
    //  正则匹配 Mozilla/x.0 和 安卓手机
    console.log(ua);
    if(ua.search(/(?:mozilla\/[345]\.0|android)/i)!=-1){
        next();
    }else{
        res.status(403).json({code:403,msg:"this Web client not visit"});
    }
};