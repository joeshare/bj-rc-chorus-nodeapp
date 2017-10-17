/**
 * Created by AnThen on 2017-2-23.
 * 图数据管理服务
 */
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');
var sessionagant = require('../utils/sessionAgent');

var defualtCfg={
        url:CONSTANT.fenRemoteHost+":"+CONSTANT.fenRemotePort+'/graphManage',
        contentType:'application/json'
};

/**
 *获取图数据列表
 * @param req
 * @param res
 * @param next
 */
function GetGraphInfoList(req, res, next){
    var projectcode =sessionagant.getCurrentProjectInfo(req).projectCode;
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+='/getGraphInfoList/'+req.body.pageNum+'/'+req.body.pageSize;
    delete req.body.pageNum;
    delete req.body.pageSize;
    opt.data=req.body;
    opt.data.projectCode = projectcode;
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
 *添加图数据
 * @param req
 * @param res
 * @param next
 */
function GraphInfoCreate(req, res, next){
    var projectcode =sessionagant.getCurrentProjectInfo(req).projectCode;
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+='/graphInfoCreate';
    opt.data=JSON.parse(req.body.object) ;
    opt.data.projectCode = projectcode;
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
 *获取图数据详情
 * @param req
 * @param res
 * @param next
 */
function GetGraphInfoDetails(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/getGraphInfoDetails/'+req.body.dataid;
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
 *获取数据类型字典列表
 * @param req
 * @param res
 * @param next
 */
function GetDatatypeList(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/getDatatypeList';
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
 *通过点名称模糊查询点列表
 * @param req
 * @param res
 * @param next
 */
function GetVertexListByName(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    if(req.body.vertexName)
    {
        opt.url+='/getVertexListByName/'+req.body.vertexCode+'/'+req.body.vertexName;
    }
    else {
        opt.url+='/getVertexListByName/'+req.body.vertexCode+'/\'\'';
    }
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
 *所有点殂
 * @param req
 * @param res
 * @param next
 */
function getAllVertex(req, res, next){
    var projectcode =sessionagant.getCurrentProjectInfo(req).projectCode;
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/getAllVertex/'+projectcode+'/';
    //opt.data.projectCode = projectcode;
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
 *校验数据Code
 * @param req
 * @param res
 * @param next
 */
function VerifyDataCode(req, res, next){
    var projectcode =sessionagant.getCurrentProjectInfo(req).projectCode;
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+='/verifyDataCode';
    opt.data=req.body;
    opt.data.projectCode = projectcode;
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
    getGraphInfoList: GetGraphInfoList,
    graphInfoCreate: GraphInfoCreate,
    getGraphInfoDetails:GetGraphInfoDetails,
    getDatatypeList:GetDatatypeList,
    getVertexListByName:GetVertexListByName,
    verifyDataCode:VerifyDataCode,
    getAllVertex:getAllVertex
}