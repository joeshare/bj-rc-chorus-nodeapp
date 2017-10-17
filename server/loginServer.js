/**
 * Created by AnThen on 2017-2-23.
 */

var authInterface = require('../modules/authIntegration/AuthenticationInterface.js');
var redisServer = require('../utils/redisServer');
var CONSTANT = require('../config/constant');
/**
 * 获取维护状态，当登录后就要判断
 */
function fetchOperationStatus(req, res, next){
    redisServer.get(CONSTANT.operationStatusCode,function(err,result){
        console.log('changeOperationStatus')
        console.log(err,result)
        if(!err){
           res.send({code:0,msg:'操作成功',data:{value:result}})
        }else{
           res.send({code:CONSTANT.code.err,msg:'操作失败'})
        }
   })
}
module.exports = {
    login:authInterface.login,
    logout:authInterface.logout,
    fetchOperationStatus:fetchOperationStatus
}