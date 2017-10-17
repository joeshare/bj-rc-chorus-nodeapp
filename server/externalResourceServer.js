/**
 * Created by Blair on 2017/4/10.
 */

/**
 * Created by Blair
 */
'use strict'
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');

var defualtCfg={
    url:CONSTANT.remoteActionUrl,
    contentType:'application/json',
    pathUrl:'/resource/out'
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

function list(req, res,next){
    console.log("server list");
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);
    opt.url += defualtCfg.pathUrl;
    let urlParam = getUlrParams(req.body);
    opt.url += urlParam;
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

function add (req, res,next) {
    console.log("server add");
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);
    opt.url += defualtCfg.pathUrl;
    opt.url += "/new";
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

function update (req, res,next) {
    console.log("server update");
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);
    opt.url+=defualtCfg.pathUrl;
    opt.url += '/update';
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

function del(req, res,next){
    console.log("server del");
    defualtCfg.method="get";
    let opt=appUtil.extend({},defualtCfg);
    let urlParam = getUlrParams(req.body);
    opt.url+= defualtCfg.pathUrl;
    opt.url += '/del/';
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


function detail (req, res,next) {
    console.log("server detail");
    defualtCfg.method="get";
    let opt=appUtil.extend({},defualtCfg);
    let urlParam = getUlrParams(req.body);
    opt.url+=defualtCfg.pathUrl;
    opt.url+='/get/';
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

//测试数据库连接
function testconnection(req,res,next){
    console.log("server testConnecton");
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);
    opt.url += '/database/test/connection';
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

module.exports={
    list:list,
    add:add,
    delete:del,
    update:update,
    detail:detail,
    testconnection:testconnection
}