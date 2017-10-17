/**
 * Created by AnThen on 2017-2-23.
 * 项目管理服务
 */
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');
var httClient=require('../utils/httpClient');
var sessionagant = require('../utils/sessionAgent');
var defualtCfg={
        url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/data_access',
        contentType:'application/json'
};
/**
 * 列表数据
 * @param req
 * @param res
 * @param next
 */
function select_application(req, res, next){
    var userid = sessionagant.getUserId(req);

    //console.log('userid',userid)
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    
    if(req.body.approved)
    {
        opt.url+='/select_application/'+userid+'/'+req.body.approved+'/'+req.body.pageNum+'/'+req.body.pageSize;
    }
    else {
        opt.url+='/select_application/'+userid+'/'+req.body.pageNum+'/'+req.body.pageSize;
    }
    console.log( opt.url)
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
 * 详情
 * @param req
 * @param res
 * @param next
 */
function application_detail(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/application_detail/'+req.body.applyFormId;
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
 * 待申请处理
 * @param req
 * @param res
 * @param next
 */
function approve(req, res, next){
//create
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/approve';

    opt.data=req.body;
    opt.data.dealUserId = sessionagant.getUserId(req);
    opt.data.userName = sessionagant.getUserName(req);

    //console.log('opt.dataopt.dataopt.dataopt.data',opt.data);
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

module.exports = {
    select_application: select_application,
    application_detail: application_detail,
    approve:approve
}