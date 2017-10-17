/**
 * Created by AnThen on 2017-2-23.
 * 公共服务
 */
'use strict'
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');
var sessionAgent=require('../utils/sessionAgent.js');

var defualtCfg={
        url:CONSTANT.fenRemoteHost+":"+CONSTANT.fenRemotePort+'/',
        contentType:'application/json'
};

/**
 *获取项目列表
 * @param req
 * @param res
 * @param next
 */
function projectList(req, res, next){
    console.log('---------------------------server projectList');
    defualtCfg.method="GET";
    let opt=appUtil.extend({},defualtCfg);
    opt.url = CONSTANT.remoteActionUrl + '/projectinfo/get/u/'+sessionAgent.getUserInfo(req).user_code+"/1/100000";

    opt.callBack=function(error, response, body){
        console.log(error);
        if(error){
            res.send(error);
        }else{

            var returnData = {};
            returnData.data = [];

            var resData=JSON.parse(body);
            if(resData.code =="0" && resData.data && resData.data.list && resData.data.list.length){
                for(var t=0;t<resData.data.list.length;t++){
                    returnData.data.push({
                        "projectId": resData.data.list[t].projectId,
                        "projectCode": resData.data.list[t].projectCode,
                        "projectName": resData.data.list[t].projectName
                    })
                }
            }

            returnData.data.unshift({
                "projectId": 123,
                "projectCode": "hotspottest11",
                "projectName": "基本测试"
            });

            res.send(returnData);
        }

    }
    httpClient(opt);

}

module.exports = {
    projectList:projectList
}