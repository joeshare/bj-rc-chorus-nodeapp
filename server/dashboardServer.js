/**
 * Created by AnThen on 2017-2-23.
 * 即席查询服务
 */
'use strict'
var sessionagant = require('../utils/sessionAgent');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');

var defualtCfg={
        url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/dashboard',
        contentType:'application/json',
        userid:0
};

/**
 *资源
 * @param req
 * @param res
 * @param next
 */
function resource(req, res, next){

    let returnJSON ={
        "code": "0",
        "msg": "成功",
        "data": {
            "AllCPU": 0,
            "Allmemery": 0,
            "Alldisk": 0,
            "AcitveCPU": 0,
            "Activememery": 0,
            "Activedisk": 0,
            "ContentUsed": 0,
            "ContentActive": 0
        }
    };
    defualtCfg.method="GET";
    var pomise1 = new Promise(function (resolve) {
        defualtCfg.method="GET";
        var opt=appUtil.extend({},defualtCfg)
        opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/resource_inner/get_by_project_id/'+req.body.projectId;
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {
                body = JSON.parse(body);
                if(body.data){

                    returnJSON.data.AllCPU  =body.data.resourceCpu;
                    returnJSON.data.Allmemery = body.data.resourceMemory;
                    returnJSON.data.Alldisk = body.data.resourceStorage;
                }
                resolve();
            }
        }
        httpClient(opt);
    });

    var pomise2 = new Promise(function (resolve) {
        var opt=appUtil.extend({},defualtCfg)

        opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/resource_inner/get_left/'+req.body.projectId;
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {
                body = JSON.parse(body);
                if(body.data)
                {
                    returnJSON.data.AcitveCPU  =body.data.resourceCpu;
                    returnJSON.data.Activememery = body.data.resourceMemory;
                    returnJSON.data.Activedisk = body.data.resourceStorage;
                }

                resolve();
            }
        }
        httpClient(opt);
    });

    var pomise3 = new Promise(function (resolve) {

        console.log('containers')
        var opt=appUtil.extend({},defualtCfg)
        opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+`/project/${req.body.projectId}/containers/stats`;
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {
                body = JSON.parse(body);

                    returnJSON.data.ContentUsed  =body.data.used;
                    returnJSON.data.ContentActive = body.data.remaining;

                resolve();
            }
        }
        httpClient(opt);
    });

    Promise.all([pomise1,pomise2,pomise3]).then(function (values) {

        res.send(returnJSON);
    });
}


/**
 *成员
 * @param req
 * @param res
 * @param next
 */
function member(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+`/project/member/statistics/${req.body.projectId}`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}

/**
 *数据
 * @param req
 * @param res
 * @param next
 */
function data(req, res, next){

    let returnJSON =
    {
        "code": "0",
        "msg": "成功",
        "data": {
            "attention": [],
            "used": [],
            "record":[],
            "storage": [],
            "tablecount": 0,
            "storagecount": 0
        }
    };

    defualtCfg.method="GET";
//关注
    var pomise1 = new Promise(function (resolve) {

        var opt=appUtil.extend({},defualtCfg)
        opt.url+=`/tableAttention/${req.body.projectId}/5`;
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {
                body = JSON.parse(body);
                returnJSON.data.attention  =body.data;
                resolve();
            }
        }
        httpClient(opt);
    });

//已使用
    var pomise2 = new Promise(function (resolve) {

        var opt=appUtil.extend({},defualtCfg)
        opt.url+=`/tableUsed/${req.body.projectId}/top5`
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {
                body = JSON.parse(body);
                returnJSON.data.used  =body.data;
                resolve();
            }
        }
        httpClient(opt);
    });


//记录
    var pomise3 = new Promise(function (resolve) {

       var opt=appUtil.extend({},defualtCfg)
        opt.url+=`/tableRows/${req.body.projectId}/top`;//'/resource_inner/get_left/'+req.body.projectId;
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {
                body = JSON.parse(body);
                returnJSON.data.record  =body.data;
                resolve();
            }
        }
        httpClient(opt);
    });

//存储
    var pomise4 = new Promise(function (resolve) {

        var opt=appUtil.extend({},defualtCfg)
        opt.url+=`/tableStorage/${req.body.projectId}/top`;//'/resource_inner/get_left/'+req.body.projectId;
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {
                body = JSON.parse(body);
                returnJSON.data.storage  =body.data;
                resolve();
            }
        }
        httpClient(opt);
    });

    //数据表

    var pomise5 = new Promise(function (resolve) {
        console.log('body----------1111111111111')
        var opt=appUtil.extend({},defualtCfg)
        opt.url+=`/tableData/${req.body.projectId}/total`;//'/resource_inner/get_left/'+req.body.projectId;
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {
                    body = JSON.parse(body);

                   if(body.data){
                        if(typeof body.data.tables=='number'){
                            returnJSON.data.tablecount  =body.data.tables;
                            returnJSON.data.storagecount = body.data.storage;
                        }
                   }

                resolve();
            }
        }
        httpClient(opt);
    });

    Promise.all([pomise1,pomise2,pomise3,pomise4,pomise5
    ]).then(function (values) {
        res.send(returnJSON);
    });
}

/**
 * 任务分布
 * @param req
 * @param res
 * @param next
 */
function task(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+=`/${req.body.projectId}/task/distribution`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}


/**
 * 批量任务分布
 * @param req
 * @param res
 * @param next
 */
function batchtask(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+=`/${req.body.projectId}/batchTask/execStatusDist/10`;//req.body.projectId+'/listTable/'+sessionagant.getUserId(req);
    opt.callBack=function(error, response, body){
        console.log('rrrrrrrrrrrrrrr10',body);
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}

/**
 *流式任务
 * @param req
 * @param res
 * @param next
 */
function streamtask(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+=`/${req.body.projectId}/streamTask/execStatusDist/10`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}

/**
 *执行时间长的任务
 * @param req
 * @param res
 * @param next
 */
function exectime(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+=`/${req.body.projectId}/batchTask/longestExecTime/5`;//req.body.projectId+'/listTable/'+sessionagant.getUserId(req);
    opt.callBack=function(error, response, body){
        console.log('rrrrrrrrrrrrrrr12',body);
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}

module.exports = {
    resource: resource,
    member: member,
    data:data,
    task:task,
    batchtask:batchtask,
    streamtask:streamtask,
    exectime:exectime
}