/**
 * Created by AnThen on 2017-2-23.
 * 任务开发
 */
var httpClient = require('../utils/httpClient');
var appUtil = require('../utils/appUtil');
var CONSTANT = require('../config/constant');
var httClient = require('../utils/httpClient');
var sessionAgent = require('../utils/sessionAgent');
var redisServer = require('../utils/redisServer');
var defualtCfg = {
    url: CONSTANT.remoteHost + ":" + CONSTANT.remotePort ,
    method:'GET',
    contentType: 'application/json'
};
/**
 *  查询待执行的任务
 * @param req
 * @param res
 * @param next
 */
function fetchPendingJob(req, res, next){
    var opt=Object.assign({},defualtCfg)
    var pageNum=req.body.pageNum;
    var pageSize=req.body.pageSize;
    opt.url+=`/platform/maintenance/unexecuted_job/${pageNum}/${pageSize}`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }else{
            res.send(JSON.parse(body));
        }
    }
    httClient(opt);
}
function _setRedisVal(req,res){
    redisServer.set(CONSTANT.operationStatusCode,req.body.status,function(err,result){
        if(!err){
           res.send({code:0,msg:'操作成功'})
        }else{
           console.log('changeOperationStatus _setRedisVal err ',err)  
           res.send({code:CONSTANT.code.err,msg:'操作失败'})
        }

   })
}
/**
 * 维护状态改变
 * @param req
 * @param res
 * @param next
 */
function changeOperationStatus(req, res, next){
    var opt=Object.assign({},defualtCfg)
    if(req.body.status){
        opt.url+=`/platform/maintenance/status`;
        opt.data=req.body;
        opt.callBack=function(error, response, body){
            if(error){
                console.log('/platform/maintenance/status error 后台报错')
                res.send(error);
            }else{
                var resbody=appUtil.body2Json(body);
                if(!resbody||resbody.code!==0){
                  console.log('/platform/maintenance/status 后台操作失败')  
                  res.send({code:CONSTANT.code.err,msg:'操作失败'})
                  return;
                }
                _setRedisVal(req,res)
            }
        }
        httClient(opt);
        
    }else{
        res.send({code:CONSTANT.code.err,msg:'缺少参数'})
    }

}
/**
 * fetch 维护状态
 * @param req
 * @param res
 * @param next
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
/**
 * TODO::
 * 刷新chorus主题的角色数据，（放到session中）
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function refreshChorusRole(req, res, next){

}
module.exports = {
    fetchPendingJob:fetchPendingJob,
    changeOperationStatus:changeOperationStatus,
    fetchOperationStatus:fetchOperationStatus,
    refreshChorusRole:refreshChorusRole
}