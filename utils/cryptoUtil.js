/**
 * Created by Administrator on 2017/7/27.
 */
const crypto=require("crypto");

/**
 * md5Hex
 * @param text {string}
 */
function md5(text){
    const hash=crypto.createHash("md5");
    hash.update(text);
    return hash.digest("hex");
}
/**
 * aes-256-cbc加密
 * @param text {string}
 * @param password {string} base64编码的密码
 */
function aesEncrypt(text,password){
    var key=new Buffer(password,"base64");
    var iv=new Buffer(16);
    key.copy(iv,0,0,16);
    const cipher=crypto.createCipheriv("AES-256-CBC",key,iv);
    cipher.setAutoPadding(true);
    var outData;
    outData= cipher.update(text,"utf-8","base64");
    outData+=cipher.final("base64");
    return outData;
}
/**
 * aes-256-cbc 解密
 * @param text {string} base64编码密文
 * @param password {string} base64编码的密码
 */
function aesDecrypt(text,password){
    var key=new Buffer(password,"base64");
    var iv=new Buffer(16);
    key.copy(iv,0,0,16);
    const decipher=crypto.createDecipheriv("AES-256-CBC",key,iv);
    decipher.setAutoPadding(true);
    var outData;
    outData=decipher.update(text,"utf-8","base64");
    outData+=decipher.final("base64");
    return outData;
}
module.exports={md5,aesEncrypt,aesDecrypt};