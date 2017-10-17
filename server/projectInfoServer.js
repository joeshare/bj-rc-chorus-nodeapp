/**
 * Created by AnThen on 2017-2-23.
 * 项目管理服务
 */
'use strict'
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');
var httClient=require('../utils/httpClient');
var sessionagant = require('../utils/sessionAgent');
var roleconfig = require('../config/roleConfig');
var adminlogin = require('../modules/authIntegration/adminloginInterface');

var subject = require('../modules/authIntegration/SubjectInterface');
var managementInterface = require('../modules/authIntegration/ManagementInterface.js');
var projectInfoSubServer = require('./projectInfoSubServer.js');
var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/projectinfo',
    contentType:'application/json'
};
/**
 * 列表数据
 * @param req
 * @param res
 * @param next
 */
function fetchList(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)

    opt.url+='/get/u/'+sessionagant.getUserId(req)+'/'+req.body.pageNum+'/'+req.body.pageSize;
    opt.callBack=function(error, response, body){

        if(error)
        {
            res.send(error);
        }else{
            res.send(JSON.parse(body));

           // console.log('JSON.parse(body)',JSON.parse(body));
        }
    }
    httClient(opt);
}

/**
 * 下拉数据
 * @param req
 * @param res
 * @param next
 */
function selectfetchList(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/get/u/'+sessionagant.getUserId(req)+'/'+req.body.pageNum+'/'+req.body.pageSize;
    // opt.url+='/get/u/0/'+req.body.pageNum+'/'+req.body.pageSize;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            var listinfo = JSON.parse(body);

            //console.log('JSON.parse(body)',JSON.parse(body));

            var currentobj  =  sessionagant.getCurrentProjectInfo(req);

            if(listinfo.data.list&&listinfo.data.list.length>0)
            {
                var hasactive =false;
                listinfo.data.list.forEach((project)=>{
                    if(currentobj&&currentobj.projectId==project.projectId){
                        project.active = true;
                        hasactive = true;
                    }
                });
                if(!hasactive){
                    listinfo.data.list[0].active = true;
                    sessionagant.setCurrentProjectInfo(req,listinfo.data.list[0]);
                }
            }
            res.send(listinfo);
        }
    }
    httClient(opt);
}



/**
 * 获取当前项目信息
 * @param req
 * @param res
 * @param next
 */
function getcurrentProjectInfo(req,cb){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/get/u/'+sessionagant.getUserId(req)+'/1/100';

    var retobject ={};
    var currentobj  =  sessionagant.getCurrentProjectInfo(req);

    if(currentobj)
    {
        cb&&cb(null,currentobj);
    }
    else {
        opt.callBack=function(error, response, body){
            if(error)
            {
                cb&&cb(error,null);
            }
            else {
                var listinfo = JSON.parse(body);
                if(listinfo.data.list&&listinfo.data.list.length>0)
                {
                    cb&&cb(null,listinfo.data.list[0]);
                }
                else {
                    cb&&cb({"code":1001,"message":"error"},null);
                }
            }
        }
        httClient(opt);
    }

}
/**
 * 修改数据
 * @param req
 * @param res
 * @param next
 */
function modifyProject(req, res, next){

}
/**
 *
 * @param tasks array  (Promise arr)
 * @returns {*}
 */
function tasksRun(tasks) {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);
    return tasks.reduce(function (promise, task) {
        return promise.then(task).then(pushValue);
    }, Promise.resolve());
}
/**
 *
 * @param arg{}roleCfg
 * @param arg{}appCode
 * @param arg {}subjectCode
 * @param arg {}sessId
 * @param arg {}projectName
 * @param arg {}createUserId
 */
function createRoleFlow(arg){
    let fetchMaps={
            //创建角色
            createRole(argment){
                return new Promise((resolve, reject)=>{
                    if(argment.status=="stop"){
                        let error=argment.error;
                        resolve({status:'stop',error})
                        return;
                    }
                    subject.createRole(arg.appCode, arg.subjectCode, arg.sessId, `${arg.projectName}_${arg.roleCfg.name}`,arg.createUserId,
                        (error, result)=>{

                        })
                })
            }
        }
        ;
}
/**
 * 创建项目
 * @param req
 * @param res
 * @param next
 */
//caas 接口回数，如果不成功都用 error 判断，不需要code 代码
function createProject(req, res, next){
    let _this = this;
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/new';
    opt.data=req.body;
    var userid = sessionagant.getUserId(req);
    var username = sessionagant.getUserName(req);
    var appCode =CONSTANT.appCode;
    opt.data.createUserId =userid;
    opt.data.userName =username;
    var allback = function (error,result) {
        if(!error)
        {
            var sessId = result.jSessionId;
            var createSubject_cb =function (error,result) {
                if(!error) {
                    subject.getAllResouce(appCode, sessId, function (error, resresult) {
                        if(!error) {
                            var reslist = [];
                            resresult.forEach((resmap)=> {
                                reslist.push(resmap.identifier);
                            })
                            let subjectCode=result.code;
                            let createUserId=opt.data.createUserId;
                            let projectName=opt.data.projectName;
                            let roleconfig2RequestArr=projectInfoSubServer.roleconfig2RequestArr(roleconfig,{appCode,subjectCode,sessId,createUserId,projectName,req,response:res,next,resresult,reslist});
                            require("async").parallel(roleconfig2RequestArr,
                                function(error, resArr){
                                    console.log("------roleconfig2RequestArr----",resArr)
                                    if(error){
                                        res.send(error);
                                    }else{
                                       var flag= resArr.every((res)=>{
                                            return res.code==0;
                                        })
                                        let data={};
                                        if(flag){
                                            resArr.every(o=>{
                                                if(o.data){
                                                    data=o.data;
                                                    return false;
                                                }
                                                return true;
                                            })
                                            res.send({code:0,msg:'项目创建成功',data});
                                        }else{
                                            res.send(lastRes);
                                        }
                                    }
                                });
                        }else{
                            res.send({"code":400,"msg":"获取资源列表失败"});
                        }
                    })
                }else {
                    res.send({"code":400,"msg":"主题创建失败"});
                }
            }
            //创建主题
            subject.createSubject(appCode,sessId,opt.data.projectName,opt.data.createUserId,createSubject_cb);
        }
        else {
            res.send(error);
        }
    }
    adminlogin.login(allback);
}


//chorus 新增
function projectMemberNew(projectId,userId,roleId,cb) {
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)

    opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+"/project/member/new";
    opt.data={
        "projectId": projectId,
        "roleId": roleId,
        "userId": userId
    };
    opt.callBack=function(error, response, body){
        var resbody = appUtil.body2Json(body);
        if(error||resbody.code !=0)
        {
            managementInterface.deleteUserFromCaas(userId,roleId,function (err, result) {

                if(error)
                {
                    cb&&cb(error,null);
                }
                else{
                    cb&&cb(resbody,null);
                }
                /*if(err){
                 cb&&cb(err,null);
                 }else{
                 cb&&cb(error,null);
                 }*/
            })
        }
        else {
            cb&&cb(null,body);
        }
    };
    httpClient(opt);
}
/**
 * 基本信息
 * @param req
 * @param res
 * @param next
 */
function fetchInfo(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/get/'+req.body.projectId;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }

    }
    httClient(opt);
    // GET /projectinfo/get/{projectId}
}

/**
 * 成员信息
 * @param req
 * @param res
 * @param next
 */
function memberinfo(req, res, next){
    var allback = function (error,result) {

        var subjectcode = req.body.projectId;

        var sessId = result.jSessionId;

        subject.getmemberbySubjectCode(subjectcode,sessId,function (error,result) {


            res.send({"code":0,"data":result});

        });
    }
    adminlogin.login(allback);

}

/**
 * 资源配置
 * @param req
 * @param res
 * @param next
 */
function rescfg(req, res, next){

    // GET /instance_info/list/{projectId}

    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/instance_info/list/'+req.body.projectId;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }

    }
    httClient(opt);
}

/**
 * 外部资源
 * @param req
 * @param res
 * @param next
 */
function externalres(req, res, next){

//POST /resource/out/get/p

    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/resource/out/get/p';

    opt.data=req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }

    }
    httClient(opt);
}

/**
 * 所剩资源
 * @param req
 * @param res
 * @param next
 */
function getleft(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/resource_inner/get_left/'+req.body.projectId;

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httClient(opt);
}


/**
 * 修改项目
 * @param req
 * @param res
 * @param next
 */
function changeproject(req, res, next){
    sessionagant.setCurrentProjectInfo(req,req.body);

    res.send({"code":0,"message":"OK"});
}

/**
 * 删除项目
 * @param req
 * @param res
 * @param next
 */
function deleteproject(req, res, next){


    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/projectinfo/canceled';
    req.body.updateUserId = sessionagant.getUserId(req);
    req.body.userName =sessionagant.getUserName(req);
    opt.data=req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            if(JSON.parse(body).code=="0"){
                deleteprojectlocal(req, res, next,{userid:req.body.updateUserId,username:req.body.userName ,projectId:req.body.projectId});
            }
            else{
                res.send(JSON.parse(body))
            }

        }
    }
    httClient(opt);
}


/**
 * 删除项目通知
 * @param req
 * @param res
 * @param next
 */
function reportproject(report,typs){


    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/projectinfo/canceled/confirm/'+typs;

    opt.data={projectId:report.projectId,userName:report.username,updateUserId:report.userid};  //userid:req.body.updateUserId,username:req.body.userName ,projectId:req.body.projectId};
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {

        }
    }
    httClient(opt);
}

function deleteprojectlocal(req, res, next,report) {

    let _this = this;
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.data=req.body;
    let projectname  = req.body.projectName;
    var appCode =CONSTANT.appCode;
    var allback = function (error,result) {
        if(!error)
        {
            var sessId = result.jSessionId;
            //console.log('appCode_sessId',appCode,sessId)
            //获取主题列表
            subject.getAllSubject(appCode, sessId,function (error,rest) {

                let fmcode ='';
                rest.forEach(fm=>{
                    if(fm.name==projectname)
                    {
                        fmcode =fm.code;
                    }
                })
                console.log('fmcode',fmcode);
                if(fmcode){
                    subject.deleteSubject(fmcode,sessId,function (error,restsub) {
                        if(!error){
                            reportproject(report,1);
                            res.send({code:'0',msg:'删除成功！'});
                        }
                        else{
                            reportproject(report,0);
                            console.log('error',error);
                            res.send({code:'404',msg:'对应主题删除失败！'});
                        }
                    })
                }else{
                    res.send({code:'404',msg:'找不到对应主题！'});
                }
            });
        }
        else {
            res.send(error);
        }
    }
    adminlogin.login(allback);
}

module.exports = {
    fetchList: fetchList,
    //暂时没有用
    modifyProject: modifyProject,
    createProject:createProject,
    fetchInfo:fetchInfo,
    externalres:externalres,
    rescfg:rescfg,
    memberinfo:memberinfo,
    getleft:getleft,
    changeproject:changeproject,
    selectfetchList:selectfetchList,
    getcurrentProjectInfo:getcurrentProjectInfo,
    deleteproject:deleteproject
}