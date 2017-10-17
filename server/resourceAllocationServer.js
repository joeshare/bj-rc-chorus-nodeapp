/**
 * Created by Blair
 */
'use strict'
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');
var sessionAgent=require('../utils/sessionAgent');
var defualtCfg={
        url:CONSTANT.remoteActionUrl,
        contentType:'application/json'
};

/**
 * 
 * @param {由于默认前端调用nodejs服务api的时候，全是post。所以 第三方api get请求的时候，默认传来一个url参数} body 
 */
function getUlrParams(body){
    if (body.url && body.url.length){
        let urlParam =body.url;
        delete body.url;

        return urlParam;
    }else{
        return '';
    }
}

//创建容器
function addResourceAllocation (req, res,next) {
    console.log("server addResourceAllocation");
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);    
    opt.url +="/instance_info/create";    
    opt.data=req.body;
    opt.callBack=function(error, response, body){
        console.log('==========')
        console.log(error,body)
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {            
            res.send(JSON.parse(body));
        }
    }    
    httpClient(opt);
}

//操作容器状态传ID 和 要变更为的状态
function operCon(req,res,next){
    console.log('server operCon');
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);    
    let urlParam = getUlrParams(req.body);
    opt.url +="/instance_info";
    opt.url+= urlParam;    
    opt.data=req.body;
    opt.callBack=function(error, response, body){        
        if(error)
        {            
            res.send(JSON.parse(error));
        }
        else {
            res.send(JSON.parse(body));
        }

    }
    httpClient(opt);
    
}

//获取容器列表
function getResourceAllocation(req, res,next){
    console.log("server getResourceAllocation");
    defualtCfg.method="get";
    let opt=appUtil.extend({},defualtCfg);
    let urlParam = getUlrParams(req.body);
    opt.url +="/instance_info";
    opt.url += urlParam;
    //opt.data=req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {            
            res.send(JSON.parse(body));
        }

    }
    httpClient(opt);    
}

//获取申请资源历史
function getProsecution (req, res,next) {
    console.log("server getResourceAllocation");
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);    
    opt.url +="/resource/apply/project";    
    opt.data=req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {            
            res.send(JSON.parse(body));
        }

    }
    httpClient(opt);
}

//申请资源
function addProsecution (req, res,next) {
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);    
    opt.url +="/resource/apply";    
    opt.data=req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {            
            res.send(JSON.parse(body));
        }
    }    
    httpClient(opt);
}

//获取资源模板
function getReourceTemplae(req, res,next){
    console.log("server getReourceTemplae");
    defualtCfg.method="get";
    let opt=appUtil.extend({},defualtCfg);    
    opt.url +="/resource_template/list_all";    
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {            
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);    
}

//容器调整
function reourceAdjust(req,res,next){
    console.log('server resourceAdjust');
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);
    opt.url +="/instance_info/modify";
    opt.data=req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}

//获取容器环境列表
function reourceEnvironment(req,res,next) {
    console.log("server reourceEnvironment");
    defualtCfg.method = "get";
    let opt = appUtil.extend({},defualtCfg);
    opt.url += "/environment/list_all";
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}
//获取可用资源
function availableResource(req,res,next) {
    console.log("server availableResource");
    defualtCfg.method = "get";
    let opt = appUtil.extend({},defualtCfg);
    let urlParam = getUlrParams(req.body);
    opt.url += "/resource_inner/get_left";
    opt.url += urlParam;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {
            console.log("======================",JSON.parse(body))
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}

//获取容器启动状态
function getInfo(req, res, next) {
    console.log('server getInfo');
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);
    opt.url +="/instance_info/getinfo";
    opt.data = req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}

module.exports={
    addResourceAllocation:addResourceAllocation,
    addProsecution:addProsecution,
    getResourceAllocation:getResourceAllocation,    
    operCon:operCon,
    getProsecution:getProsecution,
    getReourceTemplae:getReourceTemplae,
    reourceAdjust:reourceAdjust,
    reourceEnvironment:reourceEnvironment,
    availableResource:availableResource,
    getInfo:getInfo
};