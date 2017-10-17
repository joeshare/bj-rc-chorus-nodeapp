/**
 * Created by AnThen on 2017-3-17.
 */
'use strict'
var exports = module.exports = {};
var crypto = require("crypto");
var Agent = require("./agent.js");
var CONSTANT = require("../../config/constant.js");
var sessionAgent = require("../../utils/sessionAgent.js");
var loggerHelper = require("../../utils/loggerHelper.js");
var rsaconfig = require('../../config/rsaConfig');
var adminlogin = require('./adminloginInterface');
var subjectuntils = require('./SubjectInterface');
var async = require("async")
var agent = new Agent(
    CONSTANT.caas.host,
    CONSTANT.caas.port,
    CONSTANT.caas.urlPrefix,
    CONSTANT.caas.appKey,
    CONSTANT.caas.appSecret
);
let startTime;
exports.login = function(req, res) {
    var xAuthToken = null;
    try{
        xAuthToken = sessionAgent.getXAuthToken(req);
    }catch (e){
        loggerHelper.logError("login getXAuthToken ",e)
        console.log("login getXAuthToken ",e)
    }
    var logincount=3;
    req.body.password = rsaconfig.decrypt(req.body.password);
    req.body.login_name = rsaconfig.decrypt(req.body.login_name);

    if(!req.body.login_name||!req.body.password){
        res.send({
            code:CONSTANT.code.loginErr,
            msg:'missing login parameters'
        });
        return;
    }
    //crypto.createHash("md5").update(req.body.password).digest("hex"),
    startTime=new Date().getTime();
    function trylogin() {

        agent.login(
            req.body.login_name,
            req.body.password,
            req.body.vcode,
            xAuthToken,
            function(err, result) {
                console.log('login-----',err);
                let time=new Date().getTime()-startTime;
                console.log('login----- time-----',time);
                console.log('logincount-----',logincount);
                loggerHelper.logError('login time',time)
                loggerHelper.logError('logincount',logincount)
                //err = true;
                if(!err && result.success) {
                    sessionAgent.setXAuthToken( req,result.xAuthToken)
                    _doAuth(result.auth_code, req, res);
                }else if(!err && !result.success){
                    console.log("-------------------",{code:result.errorCode,msg:result.errorMessage})
                    res.send({code:result.errorCode||502,msg:result.errorMessage});
                    loggerHelper.logError('login success not true', result)
                } else {
                    logincount--;
                    if(logincount<=0){
                        loggerHelper.logError('login failure err ', err)
                        loggerHelper.logError('login failure result ', err)
                        res.send({
                            code:CONSTANT.code.loginErr,
                            msg:'login failure'
                        });
                    }
                    else
                    {
                        trylogin();
                    }
                }
            }
        );
    }

    trylogin();

}
exports.auth = function(req, res) {
    _doAuth(req.query.code, req, res);
}

exports.authByPost = function(req, res) {
    _doAuth(req.body.code, req, res);
}

/**
 *   batchCheckAuth 有获取资源功能，同时还有刷新auth_code 功能
 * @param req
 * @param res
 * @param callback
 */
exports.batchCheckAuth = function(req, res,callback) {
    var accessToken=req.session[CONSTANT.session.accessInfo].accessToken;
    agent.batchCheckAuth(accessToken, CONSTANT.accessArr, 'read',function(err, result){
        if(callback){
            callback(err, result)
        }else{
            if(!err) {
                if(result.success){
                    sessionAgent.setUserResource(req,result.resource_codes)
                    res.send({code:0,msg:"success",data:{token_refresh_flag:result.token_refresh_flag,resource_codes:result.resource_codes}});
                }else{
                    res.send({code:result.errorCode,msg:result.errorMessage});
                }
            } else {
                loggerHelper.logError(err)
                res.send({code:CONSTANT.code.err,msg:"batchCheckAuth failure"});
            }
        }

    })
}
/**
 * 获取chorus这个主题下的全部角色
 * @param {*} cb 
 */
function _fetchChorusRole(usercode,cb){
    adminlogin.login(function (error,loginresult) {
        var sessid = loginresult.jSessionId;
        if(!error){
            subjectuntils.getRoleListByUser(usercode,CONSTANT.chorusSubjectCode,sessid,function (error,subjectresult) {
                console.log('chorusSubject error',error)
                if(!error){
                    console.log("results.chorusSubject",JSON.stringify(subjectresult))
                    cb&&cb(null,subjectresult);
                }else{
                    cb&&cb(error,[]);
                }
            })
        }
        else {
            cb&&cb(error,[]);
        }
    })
}
function _doAuth(authCode, req, res) {
    agent.auth(authCode, function(err, result) {
        console.log('authCode----',result)
        let time=new Date().getTime()-startTime;
        console.log('_doAuth----- time-----',time);
        loggerHelper.logError('_doAuth time',time)
        if(!err) {
            if(result.success){
                sessionAgent.setAccessInfo(req,result)
                require("async").waterfall([
                    function(notice){
                        //获取用户信息
                        agent.getUserInfo(result.access_token, function(err1, result1) {
                            console.log("--------result1---------",result1)
                            notice(null,result1);
                        });
                    },
                    function(arg0,notice){
                        var code=0,msg="success";
                        try{
                            var resJson=JSON.parse(JSON.stringify(arg0))
                            var  extentionInfo=JSON.parse(resJson.extinfo[0].extentionInfo);
                            sessionAgent.setUserInfo(req,resJson)
                            sessionAgent.setUserId(req,resJson.user_code)
                            sessionAgent.setUserName(req,resJson.user_name)
                            sessionAgent.setIpaUserInfo(req,extentionInfo)
                        }catch (e){
                            console.log("--------catch---------",e)
                            loggerHelper.logError(e)
                            code=CONSTANT.code.userInfoErr;
                            msg="user Info failure";
                        }
                        console.log("----------code-------",code)
                        if(code==0){
                            var usercode  =sessionAgent.getUserId(req);
                            _fetchChorusRole(usercode,function(err2,roles){
                                let [code2,msg]=[0,""]
                                if(!err2){
                                    sessionAgent.setChorusRoleCode(req,roles);
                                }else{
                                    code2=CONSTANT.code.chorusRoleErr;
                                    msg='fetch chorus role failure'
                                }
                                notice(null,{code:code2,msg:msg})
                                
                            })
                        }else{
                            notice(null,{code:code,msg:msg})
                        }
                       
                    }], 
                    function(asyncerr, results) {
                        if(!asyncerr){
                            res.send(results);
                        }else{
                            loggerHelper.logError(asyncerr)
                        }
                    }
                );
            }else{
                res.send({code:result.errorCode,msg:result.errorMessage});
            }

        } else{
            loggerHelper.logError(err)
            res.send({code:0,msg:"auth failure"});
        }
    });
}


exports.signup = function(req, res) {
    var xAuthToken = sessionAgent.getXAuthToken(req);
    agent.signup(
        req.body.user_name,
        crypto.createHash("md5").update(req.body.password).digest("hex"),
        req.body.email,
        req.body.mobile,
        req.body.vcode,
        xAuthToken,
        function(err, result) {
            if(!err && result.success) {
                sessionAgent.setXAuthToken(req,result.xAuthToken)
                res.redirect("/login");
            } else {
                // ws.error(res);
            }
        }
    );
}



exports.base64Vcode = function(req, res) {
    var xAuthToken = sessionAgent.getXAuthToken(req);
    agent.base64Vcode(xAuthToken, function(err, result) {
        if(!err) {
            sessionAgent.setXAuthToken(req,result.xAuthToken)
            // ws.ok(res, result.result);
        } else {
            //  ws.error(res);
        }
    });
}

exports.validateUserName = function(req, res) {
    _doValidation("UserName", req.params.name, req, res);
}

exports.validateEmail = function(req, res) {
    _doValidation("Email", req.params.email, req, res);
}

exports.validateMobile = function(req, res) {
    _doValidation("Mobile", req.params.mobile, req, res);
}

exports.validateVcode = function(req, res) {
    _doValidation("Vcode", req.params.vcode, req, res);
}
function _batchCheckAuth(){

}
function _doValidation(type, value, req, res) {
    var xAuthToken = sessionAgent.getXAuthToken(req);;
    agent["validate" + type].call(agent, value, xAuthToken, function(err, result) {
        if(!err) {
            sessionAgent.setXAuthToken(req, result.xAuthToken);
            // ws.ok(res, result);
        } else {
            // ws.error(res);
        }
    });
}

exports.logout = function(req, res) {
    var accessToken = sessionAgent.getAccessInfo(req).accessToken;
    agent.logout(accessToken, function(err, result) {
        sessionAgent.setCurrentProjectInfo(req,null);
        sessionAgent.setUserId(req, null);
        res.clearCookie(CONSTANT.cookie.identityKey);
        console.log(req.session.cookie)
        req.session.destroy(function(err1) {
            console.log(' req.session.destroy',err1)
            if(err1){
                console.log(err1)
                loggerHelper.logError("logout session.destroy ",err1)
            }
            if(!err) {
                if(result.success) {
                    res.send({code:0,msg:'success'});
                }
            } else {
                res.send(result);
            }
        })

    });
}

exports.authorise = function(req, res, next) {
    if(sessionAgent.getUserId(req)) {
        var accessToken =sessionAgent.getAccessInfo(req).accessToken;
        agent.checkAuth(accessToken, "/all", function(err, result) {
            if(!err && result.success) {
                next();
            } else {
                req.session.user = null;
                _toLogin();
            }
        });
    } else {
        _toLogin();
    }

    function _toLogin() {
        var url = "http://" + config.server.host + ":" + config.server.port + "/auth?code=";
        res.redirect("http://caas-user/login.html?redirect_uri=" + encodeURIComponent(url) + "&client_id=" + config.caas.appKey);
    }
}

//检查session
exports.checkSession=function(req, res, next){

    if(CONSTANT.appStatus=='debug'){
        next();
        return;
    }
    var path=req.path.toLowerCase();
    if(req.session&&sessionAgent.getUserId(req)){
        next();
    }else{
        res.send({code:CONSTANT.code.sessionOut, msg: 'session time out'})
    }
}
//检查访问权限
exports.checkAccess=function(req, res, next,resource){
    if(req.session&&sessionAgent.checkUserResource(req,resource)){
        next();
    }else{
        res.send({code:CONSTANT.code.accessErr, msg: '没有权限进行此操作'})//access denied
    }
}

exports.getUserInfo=function(req, res, next){
    res.send({code:0, msg: 'success',data: {name:sessionAgent.getUserName(req),id:sessionAgent.getUserId(req)}})
}
exports.getIpaUserInfo=function(req, res, next){
    res.send({code:0, msg: 'success',data: sessionAgent.getIpaUserInfo(req)})
}