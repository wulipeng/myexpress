/**
 * Created by Administrator on 2017/7/27.
 */

/**
 * 生成随机数
 * @param length {number} 默认=32
 * @param splitStr {string} 默认=""
 */
function randomStr(length,splitStr){
    length=length||32;
    splitStr=splitStr||"";
    var pad="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var outList=[];
    for(let i=0;i<length;i++){
        outList.push(pad[Math.ceil(Math.random()*pad.length)]);
    }
    return outList.join(splitStr);
}
/**
 * 随机hex
 * @param length {number} 默认=32
 * @param splitStr {string} 默认=""
 * @param isLower {boolean} 默认=false
 * @description
 * 1.randomHex()
 * 1.randomHex(32)
 * 1.randomHex(32,true)
 * 2.randomHex(32,",",true)
 */
function randomHex(length,splitStr,isLower){
    length=length||32;
    if("boolean"==typeof splitStr){
        isLower=splitStr;
        splitStr="";
    }else{
        splitStr=splitStr||"";
    }
    var pad=isLower?"0123456789abcdef":"0123456789ABCDEF";
    var outList=[];
    for(let i=0;i<length;i++){
        outList.push(pad[Math.ceil(Math.random()*pad.length)]);
    }
    return outList.join(splitStr);
}
module.exports={randomStr,randomHex};