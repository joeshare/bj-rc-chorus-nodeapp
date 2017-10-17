/**
 * Created by AnThen on 2017-2-23.
 * 任务开发
 */
 'use strict'
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
function getProjects(req, res, next) {
    var opt = Object.assign({},defualtCfg,{method:"POST"})
    //URL:/projectinfo/get/u/{pageNum}/{pageSize}
    opt.url += `/projectinfo/get/u/1/11`;
    opt.data=Object.assign({ }, req.body);

    opt.callBack = function (error, response, body) {
        if(!error){
            var json=appUtil.body2Json(body);
            if(json.code==0){
                var code=0,data=[]
                json.data.list.forEach((rec)=>{
                    data.push({"projectId":rec.projectId,
                        "projectCode":rec.projectCode,
                        "projectName":rec.projectName})
                })
                res.send({code,data})
            }else{
                res.send({code:json.code||json.status,data:[]})
            }

        }else{
            res.send(error)
        }

    }
    httClient(opt);
}
function getListData(req, res, next) {
    var opt = Object.assign({},defualtCfg,{method:"POST"})
    let pageNum=req.body.pageNum;
    let pageSize=req.body.pageSize;
    opt.url += `/xd_module/getXdModules/${pageNum}/${pageSize}`;

    opt.data={'moduleAliasName':req.body.moduleAliasName};
    
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
    getProjects,
    getListData
}