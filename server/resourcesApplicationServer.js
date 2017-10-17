/**
 * Created by Blair
 */
'use strict'
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');

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

//剩余可分配资源
function left(req,res,next){
    console.log("server denied");
    defualtCfg.method = "get";
    let opt = appUtil.extend({},defualtCfg);
    let urlParam = getUlrParams(req.body);
    opt.url += "/resource/left";//userId
    opt.url += urlParam;
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

function pending(req,res,next) {
    console.log("server pending");
    defualtCfg.method = "get";
    let opt = appUtil.extend({},defualtCfg);
    let urlParam = getUlrParams(req.body);
    opt.url += "/resource/apply/pending";///{pageNum}/{pageSize}
    opt.url += urlParam;
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

function approved(req,res,next) {
    console.log("server approved");
    defualtCfg.method = "get";
    let opt = appUtil.extend({},defualtCfg);
    let urlParam = getUlrParams(req.body);
    opt.url += "/resource/apply/approved";
    opt.url += urlParam;
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

function denied(req,res,next) {
    console.log("server denied");
    defualtCfg.method = "get";
    let opt = appUtil.extend({},defualtCfg);
    let urlParam = getUlrParams(req.body);
    opt.url += "/resource/apply/denied";
    opt.url += urlParam;
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

function approve(req,res,next){
    console.log('server approve');
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);
    opt.url +="/resource/approve";
    opt.data=req.body;
    console.log( opt.data)
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
    pending:pending,
    approved:approved,
    denied:denied,
    approve:approve,
    left:left
}