/**
 * Created by AnThen on 2017-2-23.
 * 任务开发
 */
var httpClient = require('../utils/httpClient');
var appUtil = require('../utils/appUtil');
var CONSTANT = require('../config/constant');
var httClient = require('../utils/httpClient');
var sessionAgent = require('../utils/sessionAgent');
var defualtCfg = {
    url: CONSTANT.remoteHost + ":" + CONSTANT.remotePort ,
    method:'GET',
    contentType: 'application/json'
};
const INSTANCERUN="2102";
/**
 * 列表数据
 * @param req
 * @param res
 * @param next
 */
/*
 冷阳 2017-4-10 10:55:01
 3:默认Stream source
 4:用户自定义Stream source
 5:默认Stream processor
 6:用自定义Stream processor
 7:默认Stream sink
 8:用户自定义Stream sink
 ---------------------
 3,4应该代表输入
 5,6代表处理
 7,8代表输出
 */
/*
 {
 "moduleType":1, // 模块类型(模块类型 0:查询全部 1:默认Job 2:用户自定义Job 3:默认Stream source 4:用户自定义Stream source 5:默认Stream processor 6:用自定义Stream processor 7:默认Stream sink 8:用户自定义Stream sink 9:默认Stream other 10:用户自定义Stream other 11:job definition)
 "moduleAliasName":"xxxxx" // 画面显示名称（查询时传递）
 }
 */
function getXdModules(req, res, next) {
    var opt = Object.assign({},defualtCfg,{method:"POST"})
    opt.url += '/module/getXdModules';
    opt.data=Object.assign({}, req.body);
    opt.callBack = function (error, response, body) {
        var result=appUtil.body2Json(body);
        res.send(result)
    }
    httClient(opt);
}
/**
 * 查询模块（组件）的属性
 * @param req
 * @param res
 * @param next
 */
function getModuleProperty(req, res, next) {
    //GET /xd_module/detail/with_page_element/{moduleType}/{moduleName}
    var opt = Object.assign({}, defualtCfg)
    opt.url += `/xd_module/detail/with_page_element/${req.body.moduleType}/${req.body.moduleName}`;
    opt.callBack = function (error, response, body) {
        res.send(appUtil.body2Json(body));
    }
    httClient(opt);

}
/**
 *  保存任务
 * @param req
 * @param res
 * @param next
 */
function jobSave(req, res, next){
    var opt = Object.assign({}, defualtCfg,{method:'POST'})
    opt.url += '/job/save';
    opt.data=Object.assign({}, req.body,{
        createUser:sessionAgent.getUserId(req),
        createUserName:sessionAgent.getUserName(req),
        updateUser:sessionAgent.getUserId(req),
        updateUserName:sessionAgent.getUserName(req)
    });

    opt.data.taskList=JSON.parse(opt.data.taskList);
    opt.data.schedule=JSON.parse(opt.data.schedule);
    delete opt.data.isForkTasksRelate;
    delete opt.data.schedule.scheduleTypeOptions;
    delete opt.data.schedule.labScheduleType;
    console.log(opt.data)
    opt.callBack = function (error, response, body) {
        res.send(appUtil.body2Json(body));
    }
    httClient(opt);
}
/**
 *  获取容器
 * @param req
 * @param res
 * @param next
 */
function getInstance(req, res, next){
    var opt =  Object.assign({}, defualtCfg);
    var projectId=req.body.projectId;
    opt.url += `/instance_info/list/${projectId}`;
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
 *
 * @param req
 * @param res
 * @param next
 */
/**
 *
 {
 "deployUserId":"xxxxx", 发布人用户ID
 "deployUserName":"xxxxx", 发布人用户名
 "jobId":"xxxxx", 任务ID
 "instanceId":"xxxxxx", // 容器ID
 "schedule": {
 "scheduleId": "xxxxxx",// 调度ID
 "scheduleType": "1",// 任务类型(1:一次性;2:周期)
 "cronExpression": "* 0/2 * * * ?"// CRON表达式 注：类型为2时有效
 },
 "warningInfo":{
 "excuteErrorFlg":"1", // 任务执行出现异常(0:否，1:是)
 "timeOutFlg":"1", // 任务执行时间超过(0:否，1:是)
 "timeOutInterval":"1", // 任务执行超过时间(单位:小时)
 }
 }
 */
function jobDeploy(req, res, next){
    var opt = Object.assign({}, defualtCfg,{method:'POST'})
    opt.url += `/job/deploy`;
    opt.data=Object.assign({
        deployUserId:sessionAgent.getUserId(req),
        deployUserName:sessionAgent.getUserName(req)
    }, req.body);

    //opt.data.warningConfig=JSON.parse(req.body.warningConfig),
    opt.data.schedule=JSON.parse(req.body.schedule)

    delete opt.data.schedule.scheduleTypeOptions;
    delete opt.data.schedule.labScheduleType;
    console.log(opt.data)
   // console.log(typeof opt.data.warningConfig )
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
 *卸载任务
 * @param req
 * @param res
 * @param next
 */
function jobUndeploy(req, res, next){
    var opt = Object.assign({}, defualtCfg,{method:'POST'})
    opt.url += `/job/undeploy`;
    opt.data=Object.assign({
        deployUserId:sessionAgent.getUserId(req),
        deployUserName:sessionAgent.getUserName(req)
    }, req.body);
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
 *删除任务
 * @param req
 * @param res
 * @param next
 */
function jobDelJob(req, res, next){
    var opt = Object.assign({},defualtCfg,{method:'POST'})
    opt.url += `/job/delJob`;
    opt.data=Object.assign({
        updateUser:sessionAgent.getUserId(req),
        updateUserName:sessionAgent.getUserName(req)
    }, req.body);
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
 * 任务信息查询
 * @param req
 * @param res
 * @param next
 */
function getJobInfo(req, res, next){
    var opt =  Object.assign({}, defualtCfg,{method:'POST'})
    opt.url += `/job/getJobInfo`;
    opt.data=Object.assign({}, req.body);
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
 *  部署信息
 * @param req
 * @param res
 * @param next
 */
function jobDeployInfo(req, res, next){
    var opt =  Object.assign({}, defualtCfg,{method:'POST'})
    opt.url += `/job/deployInfo`;
    opt.data=Object.assign({}, req.body);
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
 * CRON表达式验证
 * @param req
 * @param res
 * @param next
 */
//
function jobValidCronWithInterval(req, res, next){
    var opt =  Object.assign({}, defualtCfg,{method:'POST'})
    opt.url += `/job/validCronWithInterval`;
    opt.data=Object.assign({}, req.body);
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
 * Job名称重复验证
 * @param req
 * @param res
 * @param next
 */
function jobValidJobAliasName(req, res, next){
    var opt =  Object.assign({}, defualtCfg,{method:'POST'})
    opt.url += `/job/validJobAliasName`;
    opt.data=Object.assign({}, req.body);

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
 * 查询列表数据
 * @param req
 * @param res
 * @param next
 */
function getProjectJobs(req, res, next){
    var opt =  Object.assign({}, defualtCfg,{method:'POST'})
    var pageNum=req.body.pageNum;
    var pageSize=req.body.pageSize;
    opt.url += `/job/projectJob/${pageNum}/${pageSize}`;
    opt.data=Object.assign({
        "jobType":3,//任务类型(1:实时 2:定期 3:全部)
         "jobAliasName":"", //Job别名(检索时传递)
         "status":"" //状态值(检索时传递)
    }, req.body);
    delete opt.data.pageNum;
    delete opt.data.pageSize;
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
 * Task名称重复验证(xd运行名)
 * @param req
 * @param res
 * @param next
 */
function validateInfoTaskName(req, res, next){
    var opt =  Object.assign({}, defualtCfg,{method:'POST'})
    opt.url += `/job/validTaskName`;
    opt.data=Object.assign({}, req.body);
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
 * 手动执行
 * @param req
 * @param res
 * @param next
 */
function excuteJob(req, res, next){
    var opt =  Object.assign({}, defualtCfg,{method:'POST'})
    opt.url += `/job/excute`;
    opt.data=Object.assign({}, req.body);
    if(req.body.jobParameters){
        opt.data.jobParameters=JSON.parse(req.body.jobParameters)
    }
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
 * 获取当前项目下的表
 * @param req
 * @param res
 * @param next
 */
function getProjectTables(req, res, next){
    var opt =  Object.assign({}, defualtCfg)
    var userId=sessionAgent.getUserId(req);
    opt.url += `/data_access/table_authority/${userId}`;
    opt.callBack = function (error, response, body) {
        if(!error){
            var bdy=appUtil.body2Json(body);
            var arr=[];
            if(bdy&&bdy.code==0){
                bdy.data.forEach((d,i)=>{
                    arr.push({
                        value:d.tableInfoId,
                        text:`${d.projectCode}.${d.tableName}`
                    })
                })
                res.send({code:bdy.code,data:arr})
            }else{
                res.send({code:bdy.code,msg:bdy.msg})
            }

        }else{
            res.send(error)
        }
    }
    httClient(opt);
}
/**
 *
 * @param req
 * @param res
 * @param next
 */
function getSourceData(req, res, next){
    var opt =  Object.assign({}, defualtCfg,{method:'POST'})
    opt.url += `${req.body['__url']}`;
    opt.data=Object.assign({}, req.body);
    if(req.body.server){
        opt.url=`${req.body.server}${ opt.data['__url']}`;
    }
    delete  opt.data.server;
    delete  opt.data['__url'];
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }
    }
    httClient(opt);
}
module.exports = {
    getXdModules,
    getModuleProperty,
    getInstance,
    jobDeploy,
    jobSave,
    jobUndeploy,
    jobDelJob,
    getJobInfo,
    jobValidCronWithInterval,
    jobValidJobAliasName,
    getProjectJobs,
    jobDeployInfo,
    validateInfoTaskName,
    excuteJob,
    getProjectTables,
    getSourceData

}