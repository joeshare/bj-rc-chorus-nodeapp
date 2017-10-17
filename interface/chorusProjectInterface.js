/**
 * Created by AnThen on 2017-2-23.
 * 项目管理服务
 */
'use strict'
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');
var httClient=require('../utils/httpClient');
var sessionagant = require('../utils/sessionAgent');
var defualtCfg={
        url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/projectinfo',
        contentType:'application/json'
};
/**
 * 创建项目 （chorus 服务提供）
 * @param req
 * @param res
 * @param next
 * @param callBack
 */
function createProject(req, res, next,arg,callBack){
    var opt=appUtil.extend({method:"POST"},defualtCfg)
    opt.url+='/new';
    opt.data=req.body;
    opt.data.createUserId =sessionagant.getUserId(req);
    opt.data.userName = sessionagant.getUserName(req);
    opt.data.caasTopicId = arg.subjectCode;
    opt.callBack = (error, response, body)=> {
        callBack&&callBack(error, response, body)
    }
    httClient(opt);

}



module.exports = {
    createProject:createProject
}