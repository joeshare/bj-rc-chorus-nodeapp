/**
 * Created by AnThen on 2017-2-23.
 * 任务开发
 */
var httpClient = require('../utils/httpClient');
var appUtil = require('../utils/appUtil');
var CONSTANT = require('../config/constant');
var httClient = require('../utils/httpClient');
var sessionAgent = require('../utils/sessionAgent');
var taskMonitorMock = require('../mock/taskMonitorMock');
var fs = require('fs');
var defualtCfg = {
    url: CONSTANT.remoteHost + ":" + CONSTANT.remotePort ,
    method:'GET',
    contentType: 'application/json'
};
function jobMonitorList(req, res, next) {
   // res.send(appUtil.body2Json(JSON.stringify(taskMonitorMock.getList())))
    var opt = Object.assign({},defualtCfg,{method:"POST"})
    opt.url += '/job/jobMonitorList';
    opt.data=Object.assign({
        userId:sessionAgent.getUserId(req),
        projectIds:[req.body.projectId]
    }, req.body);
    opt.data.executionStatus=JSON.parse( req.body.executionStatus)
    delete opt.data.projectId;
    console.log(opt.data)
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }

    }
    httClient(opt);

}
/**
 *  流式任务列表
 * @param req
 * @param res
 * @param next
 */
function streamMonitorList(req, res, next){
    // res.send(appUtil.body2Json(JSON.stringify(taskMonitorMock.getList())))
    var opt = Object.assign({},defualtCfg,{method:"POST"})
    //return;
    opt.url += '/job/streamMonitorList';
    opt.data=Object.assign({
        userId:sessionAgent.getUserId(req),
        projectIds:[req.body.projectId]
    }, req.body);
    delete opt.data.projectId;
    console.log(opt.data)
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }
    }
    httClient(opt);
}
function getSubJobMonitorList(req, res, next) {
    var opt = Object.assign({},defualtCfg)
    var jobId=req.body.jobId;
    var executionId=req.body.executionId;
    opt.url += `/job/getSubJobMonitorList/${jobId}/${executionId}`;
    opt.data=Object.assign({
        userId:sessionAgent.getUserId(req),
        projectIds: req.body.projectId
    }, req.body);
    console.log( opt.url)
    delete opt.data.projectId;
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }
    }
    httClient(opt);
}

/**
 * 重启
 * @param req
 * @param res
 * @param next
 */
function restartJob(req, res, next){
    var opt = Object.assign({},defualtCfg,{method:"POST"})
    opt.url += `/job/restartJobExecution/${req.body.jobExecutionId}`;
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }
    }
    httClient(opt);
}
/**
 * 流式详情
 * @param req
 * @param res
 * @param next
 */
function streamMonitorDetail(req, res, next){
    var opt = Object.assign({},defualtCfg)
    opt.url += `/job/streamMonitorDetail/${req.body.jobId} `;
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }
    }
    console.log( opt.url )
    httClient(opt);
}
module.exports = {
    jobMonitorList,
    getSubJobMonitorList,
    streamMonitorList,
    restartJob,
    streamMonitorDetail
}