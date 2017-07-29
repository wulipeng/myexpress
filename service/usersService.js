var userDao=require("../dao/usersDao");

/**
 *
 * @param params {object}
 * @param callback {function(error {Error},resultObject {object})}
 */
function getUser(params){
    var bodyInfo=params;
    if(!bodyInfo.name){
        return Promise.reject(new Error("name不存在"));
    }
    return userDao.getUser(bodyInfo.name);
}
/**
 * 登录，成功缓存Redis
 * @param params {object}
 * @return {Promise} (result {boolean})
 */
async function login(params){
    if(!params.name || !params.password){
         return Promise.reject(new Error("参数不完整"));
    }
    var user=await userDao.getUser(params.name);
    return user.password==params.password;
}
/**
 * 获取列表
 * @returns {Promise}
 */
function getList(){
    return userDao.getList();
}
module.exports={getUser,login,getList};