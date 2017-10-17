/**
 * Created by AnThen on 2017-2-23.
 * 即席查询服务
 */
var sessionagant = require('../utils/sessionAgent');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');

var defualtCfg={
         method:"GET",
        url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/sqlQuery',
        contentType:'application/json',
        userid:0
};

/**
 *树型结构接口
 * @param req
 * @param res
 * @param next
 */
function getTree(req, res, next){
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/listTable/'+sessionagant.getUserId(req);
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
function _isArray(o){
    return  Object.prototype.toString.call(o) === '[object Array]'
}
function getTreeRoot(req, res, next){
    res.send([{
        id:"root",
        pid:"",
        text:"数据列表",
        type:'root',
        sortId:"",
        icon:"",
        data:{
            type:""
        },
        children:true
    }])
}
/**
 * @param req
 * @param res
 * @param next
 */
function getTreeAsync(req, res, next){
    var opt=appUtil.extend({},defualtCfg)
    opt.url+=`/tables/${sessionagant.getUserId(req)}`;
    opt.data=req.body;
    console.log(opt)
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            //{code: "222646", text: "chorus_llj_test", type: "project-authorized", leaf: false}
            let result=appUtil.body2Json(body);
            console.log(result)
            let arr=[];
            if(result&&result.code==0){
                _isArray(result.data)&&result.data.forEach(d=>{
                    arr.push({
                        id:`${d.code}`,
                        pid:opt.data.parentId||"",
                        data:{
                            type:d.type||""
                        },
                        text :d.text,
                        icon :"",
                        children:!d.leaf

                    })
                })
            }
            res.send(arr);


        }
    }
    httpClient(opt);
}
/**
 *执行结果
 * @param req
 * @param res
 * @param next
 */
function result(req, res, next){
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=`/queryResult/${sessionagant.getUserName(req)}/${req.body.pageNum}/${req.body.pageSize}`;
    opt.method="POST";
    delete req.body.pageNum;
    delete req.body.pageSize;
    opt.data=req.body;
    opt.data.currentProjectCode = sessionagant.getCurrentProjectInfo(req).projectCode;
    
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
 *执行历史
 * @param req
 * @param res
 * @param next
 */
function history(req, res, next){
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/listHistory/'+sessionagant.getUserName(req)+'/'+req.body.pageNum+'/'+req.body.pageSize;
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
    getTree: getTree,
    getTreeAsync: getTreeAsync,
    result: result,
    history:history,
    getTreeRoot:getTreeRoot
}