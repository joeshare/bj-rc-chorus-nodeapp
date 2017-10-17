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
        url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/dashboard/platform',
        contentType:'application/json'
};

/**
 *TOPData
 * @param req
 * @param res
 * @param next
 */
function top(req, res, next){


    console.log('00000000000000000001')
    let returnJSON ={
        "code": "0",
        "msg": "成功",
        "data": {
            "memory":0,
            "cpu":0,
            "storage":0,
            "project_num": 0,
            "total_data": 0,
            "data_daily_incr": 0,
            "task_success_rate": 0
        }
    };
    defualtCfg.method="GET";
    var pomise1 = new Promise(function (resolve) {
        defualtCfg.method="GET";
        var opt=appUtil.extend({},defualtCfg)
        opt.url+=`/use_rate`;
        opt.callBack=function(error, response, body){
            if(error)
            {
                resolve();
            }
            else {
                body = JSON.parse(body);

                console.log('bodybody',body);
                if(body.data){

                    returnJSON.data.memory  =body.data.memory;
                    returnJSON.data.cpu  =body.data.cpu;
                    returnJSON.data.storage  =body.data.storage;
                }
                resolve();
            }
        }
        httpClient(opt);
    });

    var pomise2 = new Promise(function (resolve) {
        var opt=appUtil.extend({},defualtCfg);

        opt.url+=`/project_num`;
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {
                body = JSON.parse(body);
                console.log('bodybody1',body);
                if(body.data)
                {
                    returnJSON.data.project_num  =body.data;
                }

                resolve();
            }
        }
        httpClient(opt);
    });

    var pomise3 = new Promise(function (resolve) {

        console.log('containers')
        var opt=appUtil.extend({},defualtCfg)
        opt.url+=`/total_data`;
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {

                body = JSON.parse(body);
                console.log('bodybody_total_data',body);
                    returnJSON.data.total_data  =body.data;
                resolve();
            }
        }
        httpClient(opt);
    });

    var pomise4 = new Promise(function (resolve) {

        console.log('containers')
        var opt=appUtil.extend({},defualtCfg)
        opt.url+=`/data_daily_incr`;
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {
                body = JSON.parse(body);
                console.log('bodybody_data_daily_incr',body);
                returnJSON.data.data_daily_incr  =body.data;
                resolve();
            }
        }
        httpClient(opt);
    });

    var pomise5 = new Promise(function (resolve) {

        console.log('containers')
        var opt=appUtil.extend({},defualtCfg)
        opt.url+=`/task_success_rate`;
        opt.callBack=function(error, response, body){

            if(error)
            {
                resolve();
            }
            else {
                body = JSON.parse(body);
                console.log('bodybody_task_success_rate',body);
                returnJSON.data.task_success_rate  =body.data;
                resolve();
            }
        }
        httpClient(opt);
    });

    Promise.all([pomise1,pomise2,pomise3,pomise4,pomise5]).then(function (values) {

        console.log('returnJSONreturnJSON',returnJSON)
        res.send(returnJSON);
    });
}


/**
 *使用率
 * @param req
 * @param res
 * @param next
 */
function userate(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+=`/resource/trend`;
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
 *数据量
 * @param req
 * @param res
 * @param next
 */
function datasize(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+=`/data_daily/trend`;
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
 *成功率
 * @param req
 * @param res
 * @param next
 */
function successrate(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+=`/task_success_rate/trend`;
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
 *KPI
 * @param req
 * @param res
 * @param next
 */
function kpi(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=`/project/kpi/${req.body.pageNum}/${req.body.pageSize}/${req.body.orderType}/${req.body.orderBy}`;
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
    httpClient(opt);
}

/**
 *exectags
 * @param req
 * @param res
 * @param next
 */
function exectags(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=`/executing_job/${req.body.jobType}/${req.body.pageNum}/${req.body.pageSize}`;
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
    httpClient(opt);
}



module.exports = {
    top: top,
    userate: userate,
    datasize:datasize,
    successrate:successrate,
    kpi:kpi,
    exectags:exectags
}