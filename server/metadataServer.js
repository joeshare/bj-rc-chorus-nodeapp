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
        url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/metadata',
        contentType:'application/json'
};
/**
 * 列表数据
 * @param req
 * @param res
 * @param nextGET /metadata/list_table
 */
function list(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/list_table/'+req.body.pageNum+'/'+req.body.pageSize+'/?q='+req.body.q;

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
 * 基本信息
 * @param req
 * @param res
 * @param next  table
 */
function querymatedatatable(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/table/'+req.body.tableid;
    console.log(opt.url)
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
 * 字段信息
 * @param req
 * @param res
 * @param next list_column
 */
function querymatedatacolumninfo(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/list_column/'+req.body.tableid;
    console.log(opt.url)
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
 * 样列数据
 * @param req
 * @param res
 * @param nextsample_data
 */
function querymatesampledata(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/sample_data/'+req.body.tableid+'/'+10;
    console.log(opt.url)
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
 * 申请权限
 * @param req
 * @param res
 * @param next
 */
function querypowerapply(req, res, next){
    defualtCfg.method="POST";

    var opt=appUtil.extend({},defualtCfg)
    opt.url =CONSTANT.remoteHost+":"+CONSTANT.remotePort+ '/data_access/apply';
    opt.data=JSON.parse(req.body.objectval);
    opt.data.userId= sessionagant.getUserId(req);
    opt.data.userName= sessionagant.getUserName(req);
    console.log(opt.data)
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
 * 申请列表
 * @param req
 * @param res
 * @param next
 */
function querypowerlist(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    var userid= sessionagant.getUserId(req);
    opt.url =CONSTANT.remoteHost+":"+CONSTANT.remotePort+ '/data_access/column_authority/'+userid+'/'+req.body.tableid;
    console.log(opt.url)
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
 * 血缘关系
 * @param req
 * @param res
 * @param next table_linage
 */
function fetchblood(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/table_linagev2/'+req.body.tableid;
    console.log(opt.url)
    opt.callBack=function(error, response, body){
        console.log(body)
        res.send(error?error:appUtil.body2Json(body));
    }
    httClient(opt);
}


/**
 * alltable
 * @param req
 * @param res
 * @param next table_linage
 */
function alltable(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/all/tables-name';
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
    list: list,
    querymatedatatable: querymatedatatable,
    querymatedatacolumninfo:querymatedatacolumninfo,
    querymatesampledata:querymatesampledata,
    querypowerapply:querypowerapply,
    fetchblood:fetchblood,
    querypowerlist:querypowerlist,
    alltable:alltable
}