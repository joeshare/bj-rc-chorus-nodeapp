/**
 主题接口
 */
var Agent = require("./agent.js");
var CONSTANT = require("../../config/constant.js");
var sessionAgent = require("../../utils/sessionAgent.js");
var httpClient=require('../../utils/httpClient');
var appUtil=require('../../utils/appUtil');
var adminlogin = require('../../modules/authIntegration/adminloginInterface');
var loggerHelper = require("../../utils/loggerHelper.js");
var agent = new Agent(
    CONSTANT.caas.host,
    CONSTANT.caas.port,
    CONSTANT.caas.urlPrefix,
    CONSTANT.caas.appKey,
    CONSTANT.caas.appSecret
);


var defualtCfg={
    url:"http://"+CONSTANT.caas.host+":"+CONSTANT.caas.port+'/api/v1',
    contentType:'application/json'
};

//创建主题
function createSubject(appcode,sessid,name,userid,cb) {

    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url='/admin/subject';
    opt.data ={'appCode':appcode,'name':name,'creationUser':userid};
    opt.sessionid = sessid;
    opt.callBack=function(error, body){
        if(error)
        {
            loggerHelper.logError(error)
            cb&&cb(error,null);
        }
        else {
            cb&&cb(null,body);
        }
    }
    //(path, method, data, jSessionId, callback)
    adminlogin.rq(opt.url,"POST",JSON.stringify(opt.data),opt.sessionid,opt.callBack);
   // httpClient(opt);
}

//创建角色
function createRole(appcode,subjectcode,sessid,name,userid,cb) {
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url='/admin/role';
    opt.data ={'appCode':appcode,'roleType':'PROTECTED','subjectCode':subjectcode,'name':name,'creationUser':userid};
    //opt.data ={'appCode':appcode,'roleType':'PUBLIC','subjectCode':subjectcode,'name':name,'creationUser':userid};
    opt.sessionid = sessid;
    opt.callBack=function(error, body){
            if(error)
            {
                loggerHelper.logError(error)
                cb&&cb(error,null);
        }
        else {
            cb&&cb(null,body);
        }
    }
    //console.log('------------------enter------',opt)
    adminlogin.rq(opt.url,"POST",JSON.stringify(opt.data),opt.sessionid,opt.callBack);
}

//创建资源
function createResouce(appcode,identifier,sessid,name,userid,cb){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url='/admin/resource';
    opt.data ={'appCode':appcode,'identifier':identifier,'name':name,'creationUser':userid};
    opt.sessionid = sessid;
    opt.callBack=function(error, body){
        if(error)
        {
            loggerHelper.logError(error)
            cb&&cb(error,null);
        }
        else {
            cb&&cb(null,body);
        }
    }
    adminlogin.rq(opt.url,"POST",JSON.stringify(opt.data),opt.sessionid,opt.callBack);
}

//绑定资源
function rolebindResouce(code,list,sessid,cb) {
    defualtCfg.method="PUT";
    var opt=appUtil.extend({},defualtCfg);
    opt.url='/admin/role/'+code;
    opt.data =list;
    opt.sessionid = sessid;
    opt.callBack=function(error, body){
        if(error)
        {
            loggerHelper.logError(error)
            cb&&cb(error,null);
        }
        else {
            cb&&cb(null,body);
        }
    }
    adminlogin.rq(opt.url,"PUT",JSON.stringify(opt.data),opt.sessionid,opt.callBack);
}

//获取主题成员
function getmemberbySubjectCode(subjectcode,sessid,cb){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.url='/admin/subject/'+subjectcode+'/user';
    opt.sessionid = sessid;
    opt.callBack=function(error, body){
        if(error)
        {
            loggerHelper.logError(error)
            cb&&cb(error,null);
        }
        else {
            console.log(body,JSON.stringify(body.roles))
            cb&&cb(null,body);
        }
    }
    adminlogin.rq(opt.url,"GET",JSON.stringify(opt.data),opt.sessionid,opt.callBack);
}

//获取应用下的所有资源
function getAllResouce(appcode,sessid,cb){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.url='/admin/app/'+appcode+'/resource';
    //opt.data ={'appCode':appcode,'identifier':identifier,'name':name,'creationUser':userid};
    opt.sessionid = sessid;
    opt.callBack=function(error, body){
        if(error)
        {
            loggerHelper.logError(error)
            cb&&cb(error,null);
        }
        else {
            cb&&cb(null,body);
        }
    }
    adminlogin.rq(opt.url,"GET",JSON.stringify(opt.data),opt.sessionid,opt.callBack);
}


//获取应用下的所有主题
function getAllSubject(appcode,sessid,cb){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.url='/admin/app/'+appcode+'/subject';
    //opt.data ={'appCode':appcode,'identifier':identifier,'name':name,'creationUser':userid};
    opt.sessionid = sessid;
    opt.callBack=function(error, body){
        if(error)
        {
            loggerHelper.logError(error)
            cb&&cb(error,null);
        }
        else {
            cb&&cb(null,body);
        }
    }
    adminlogin.rq(opt.url,"GET",JSON.stringify(opt.data),opt.sessionid,opt.callBack);
}


//删除主题
function deleteSubject(code,sessid,cb){
    defualtCfg.method="DELETE";
    var opt=appUtil.extend({},defualtCfg);
    opt.url =`/admin/subject/${code}`;
    opt.sessionid = sessid;
    opt.callBack=function(error, body){
        if(error)
        {
            loggerHelper.logError(error)
            cb&&cb(error,null);
        }
        else {
            cb&&cb(null,body);
        }
    }
    adminlogin.rq(opt.url,"DELETE",JSON.stringify(opt.data),opt.sessionid,opt.callBack);
}




//为用户赋赋予角色
function addusetorole(userCode,roleCode,sessid,cb){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url='/admin/user/'+userCode+'/role/'+roleCode;
    opt.data ={'userCode':userCode,'roleCode':roleCode};
    opt.sessionid = sessid;
    opt.callBack=function(error, body){
        if(error)
        {
            loggerHelper.logError(error)
            cb&&cb(error,null);
        }
        else {
            cb&&cb(null,body);
        }
    }

    adminlogin.rq(opt.url,"POST",JSON.stringify(opt.data),opt.sessionid,opt.callBack);
}


//获取指定用户当前主题下的角色
function getRoleListByUser(usercode,subjectCode,sessid,cb){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.url='/admin/user/'+usercode+'/subject/'+subjectCode+'/role';
    //opt.data ={'appCode':appcode,'identifier':identifier,'name':name,'creationUser':userid};
    opt.sessionid = sessid;
    opt.callBack=function(error, body){
        console.log('getRoleListByUser',error)
        if(error) {
            loggerHelper.logError(error)
            cb&&cb(error,null);
        }else {

            cb&&cb(null,body);
            // res.send(JSON.parse(body));
        }
    }
    adminlogin.rq(opt.url,"GET",JSON.stringify(opt.data),opt.sessionid,opt.callBack);
}


module.exports = {
    createSubject: createSubject,
    createRole: createRole,
    createResouce:createResouce,
    rolebindResouce:rolebindResouce,
    getmemberbySubjectCode:getmemberbySubjectCode,
    getAllResouce:getAllResouce,
    addusetorole:addusetorole,
    getRoleListByUser:getRoleListByUser,
    getAllSubject:getAllSubject,
    deleteSubject:deleteSubject
}