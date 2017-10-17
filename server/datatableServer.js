/**
 * Created by AnThen on 2017-2-23.
 * 数据表
 */
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var loggerHelper=require('../utils/loggerHelper');
var CONSTANT=require('../config/constant');
var httClient=require('../utils/httpClient');
var sessionagant = require('../utils/sessionAgent');
var defualtCfg={
        url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/table',
        contentType:'application/json'
};
/**
 * 列表数据
 * @param req
 * @param res
 * @param next
 */
function list(req, res, next){
    defualtCfg.method="GET";
    //http://10.200.32.95:8080/projectinfo/get/u/0/1/10
    //POST /table/list/{projectId}/{pageNum}/{pageSize}
    var opt=appUtil.extend({},defualtCfg)
    var pageNum=req.body.pageNum;
    var pageSize=req.body.pageSize;
    var projectId=req.body.projectId;
    opt.url+=`/list/${projectId}/${pageNum}/${pageSize}`;
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
 * @param next
 */
function baseinfo(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/get_with_column/'+req.body.tableInfoId;  
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
 * 增加项目
 * @param req
 * @param res
 * @param next
 */
function add(req, res, next){
//create
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/create';
    opt.data=JSON.parse(req.body.objectval);
    opt.data.projectId = req.body.projectId;
    opt.callBack=function(error, response, body){
        if(error){
            res.send(error);
        }else {
            res.send(JSON.parse(body));
        }
    }
    httClient(opt);
}



/**
 * 修改
 * @param req
 * @param res
 * @param next
 */
function update(req, res, next){
//create
    defualtCfg.method="PUT";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/alter';
    opt.data=JSON.parse(req.body.objectval);
    if(opt.data.columnInfoList){
        opt.data.columnInfoList = opt.data.columnInfoList.filter(m=>{
           return !m.isOlddate;
        });
    }


    opt.data.projectId = req.body.projectId;
    opt.callBack=function(error, response, body){
        if(error){
            res.send(error);
        }else {
            res.send(JSON.parse(body));
        }
    }
    httClient(opt);
}

/**
 * 删除信息
 * @param req
 * @param res
 * @param next
 */

function del(req,res,net){
    defualtCfg.method="DELETE";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/delete/'+req.body.tableInfoId;
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
 * 属性信息
 * @param req
 * @param res
 * @param next
 */
function propertylist(req, res, next){

}
/**
 * 字段类型
 * @param req
 * @param res
 * @param next
 */
function getHiveTypes(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/get_hive_types';
    opt.callBack=function(error, response, body){
        if(error){
            res.send(error);
        }else {
            var _body=appUtil.body2Json(body);
            if(_body.code==0){
                var data=[],code=0;
                _body.data.forEach((b,i)=>{
                    data.push({
                        text: b,
                        value: b
                    })
                })
                res.send({code,data});
            }else{
                res.send({code:CONSTANT.code.dataErr,data:[]});
                loggerHelper.logError(JSON.stringify(_body))
            }

        }
    }
    httClient(opt);
}


/**
 * rdb
 * @param req
 * @param res
 * @param next
 */
function rdb(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/external_datasource/rdb';
    opt.data=req.body;
    opt.data.projectId = req.body.projectId;
    opt.callBack=function(error, response, body){
        if(error){
            res.send(error);
        }else {
            res.send(JSON.parse(body));
        }
    }
    httClient(opt);
}


/**
 * table
 * @param req
 * @param res
 * @param next
 */
function table(req, res, next){
//create
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/external_datasource/table';
    opt.data=req.body;
    opt.callBack=function(error, response, body){
        if(error){
            res.send(error);
        }else {
            res.send(JSON.parse(body));
        }
    }
    httClient(opt);
}

/**
 * field
 * @param req
 * @param res
 * @param next
 */
function field(req, res, next){
//create
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/external_datasource/field';
    opt.data=req.body;
    opt.callBack=function(error, response, body){
        if(error){
            res.send(error);
        }else {
            res.send(JSON.parse(body));
        }
    }
    httClient(opt);
}
module.exports = {
    rdb:rdb,
    table:table,
    field:field,
    list: list,
    baseinfo: baseinfo,
    add:add,
    propertylist:propertylist,
    update:update,
    delete:del,
    getHiveTypes
}