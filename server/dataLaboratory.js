/**
 * Created by Blair
 */
'use strict'
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');

var defualtCfg={
        url:CONSTANT.remoteActionUrl + '/datalab',
        contentType:'application/json'
};

/**
 * 
 * @param {由于默认前端调用nodejs服务api的时候，全是post。所以 第三方api get请求的时候，默认传来一个url参数} body 
 */
function getUlrParams(body){
    if (body.url && body.url.length){
        let urlParam =body.url;
        delete body.url;

        return urlParam;
    }else{
        return '';
    }
}

/**
 * 
 * @param req
 * @param res
 * @param next
 */
function getDataLabList(req, res,next){
    console.log("server getDataLabList");
    defualtCfg.method="get";
    let opt=appUtil.extend({},defualtCfg);
    let urlParam = getUlrParams(req.body);
    opt.url+= urlParam;
    //opt.data=req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {            
            res.send(JSON.parse(body));
        }

    }
    httpClient(opt);
    
}

/**
 * 创建实验室
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function createDataLab(req,res,next){
    console.log('server createDataLab');
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);    
    opt.url+='';    
    opt.data=req.body;
    opt.callBack=function(error, response, body){        
        if(error)
        {            
            res.send(JSON.parse(error));
        }
        else {
            res.send(JSON.parse(body));
        }

    }
    httpClient(opt);
    
}


function deleteDataLab(req,res,next){
    console.log('server deleteDataLab');
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);    
    let urlParam = getUlrParams(req.body);
    opt.url+=urlParam;
    opt.data=req.body;
    opt.callBack=function(error, response, body){        
        if(error)
        {            
            res.send(JSON.parse(error));
        }
        else {
            res.send(JSON.parse(body));
        }

    }
    httpClient(opt);
     
}
function startDataLab(req,res,next){
    console.log('server startDataLab');
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);    
    let urlParam = getUlrParams(req.body);
    opt.url+=urlParam;
    opt.data=req.body;
    opt.callBack=function(error, response, body){        
        if(error)
        {        
            console.log("cb::",error);    
            res.send(JSON.parse(error));
        }
        else {
            res.send(JSON.parse(body));
        }

    }
    httpClient(opt);
    
}
function stopDataLab(req,res,next){
    console.log('server stopDataLab');
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);    
    let urlParam = getUlrParams(req.body);
    opt.url+=urlParam;    
    opt.data=req.body;
    opt.callBack=function(error, response, body){        
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {
            res.send(JSON.parse(body));
        }

    }
    httpClient(opt);
    
}

function aliveDataLab(req,res,next){
    console.log('server aliveDataLab');
    defualtCfg.method="GET";
    let opt=appUtil.extend({},defualtCfg);    
    let urlParam = getUlrParams(req.body);
    opt.url+=urlParam;    
    //opt.data=req.body;
    opt.callBack=function(error, response, body){        
        if(error)
        {
            res.send(JSON.parse(error));
        }
        else {
            res.send(JSON.parse(body));
        }

    }
    httpClient(opt);
    
}

module.exports={
    getDataLabList:getDataLabList,
    createDataLab:createDataLab,
    deleteDataLab:deleteDataLab,
    startDataLab:startDataLab,
    stopDataLab:stopDataLab,
    aliveDataLab:aliveDataLab
}