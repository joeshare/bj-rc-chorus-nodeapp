/**
 * Created by AnThen on 2017-2-23.
 * 数据图谱
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
 *通过点名称模糊查询点列表
 * @param req
 * @param res
 * @param next
 */
function GetVertexListByName(req, res, next){

   var projectcode =sessionagant.getCurrentProjectInfo(req).projectCode;
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/getVertexListByName';
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
 *通过点ID查询所有属性
 * @param req
 * @param res
 * @param next
 */
function GetPropertyByVertexId(req, res, next){
    var projectcode =sessionagant.getCurrentProjectInfo(req).projectCode;
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/getPropertyByVertexId';
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
 *获取图数据
 * @param req
 * @param res
 * @param next
 */
function vertexedgelist(req, res, next){
    var projectcode =sessionagant.getCurrentProjectInfo(req).projectCode;
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url=CONSTANT.fenRemoteHost+":"+CONSTANT.fenRemotePort+'/titan/query';
    opt.data=JSON.parse(req.body.object);
    opt.data.project = projectcode;

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
    getVertexListByName:GetVertexListByName,
    getPropertyByVertexId:GetPropertyByVertexId,
    vertexedgelist:vertexedgelist
}