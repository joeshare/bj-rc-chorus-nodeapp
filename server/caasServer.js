/**
 * Created by AnThen on 2017-3-17.
 */
var exports = module.exports = {};
var crypto = require("crypto");
var Agent = require("../utils/agent.js");
var CONSTANT = require("../config/constant.js");
var agent = new Agent(
    CONSTANT.caas.host,
    CONSTANT.caas.port,
    CONSTANT.caas.urlPrefix,
    CONSTANT.caas.appKey,
    CONSTANT.caas.appSecret
);
exports.login = function(req, res) {
    var xAuthToken = req.session[CONSTANT.session.xAuthToken];
    if(!req.body.login_name||!req.body.password){
         res.send({
             code:CONSTANT.code.loginErr,
             msg:'missing login parameters'
         });
         return;
    }
    //crypto.createHash("md5").update(req.body.password).digest("hex"),
    agent.login(
        req.body.login_name,
        req.body.password,
        req.body.vcode,
        xAuthToken,
        function(err, result) {
           // console.log("login result:",result);
            if(!err && result.success) {
                req.session[CONSTANT.session.xAuthToken]= result.xAuthToken;
               _doAuth(result.auth_code, req, res);
            }else if(!err && !result.success){
                res.send({code:result.errorCode,msg:result.errorMessage});
            } else {
                res.send({
                    code:CONSTANT.code.loginErr,
                    msg:'login failure'
                });
            }
        }
    );
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
    //console.log('accessToken',accessToken)
    agent.batchCheckAuth(accessToken, CONSTANT.accessArr, function(err, result){
        if(callback){
            callback(err, result)
        }else{
            if(!err) {
                if(result.success){
                    res.send({code:0,msg:"success",data:{token_refresh_flag:result.token_refresh_flag,resource_codes:result.resource_codes}});
                }else{
                    res.send({code:result.errorCode,msg:result.errorMessage});
                }
            } else {
                res.send({code:CONSTANT.code.err,msg:"batchCheckAuth failure"});
            }
        }

    })
}
function _doAuth(authCode, req, res) {
    agent.auth(authCode, function(err, result) {
       // console.log("auth result:",result);
        if(!err) {
            if(result.success){
                req.session[CONSTANT.session.userId]=req.body.login_name;
                req.session[CONSTANT.session.accessInfo]= {
                    accessToken : result.access_token,
                    expiresIn : result.expires_in,
                    refreshToken : result.refresh_token
                };
                res.send({code:0,msg:"success"});
            }else{
                res.send({code:result.errorCode,msg:result.errorMessage});
            }

        } else{
            res.send({code:0,msg:"auth failure"});
        }
    });
}


exports.signup = function(req, res) {
    var xAuthToken = req.session[CONSTANT.session.xAuthToken];
    agent.signup(
        req.body.user_name,
        crypto.createHash("md5").update(req.body.password).digest("hex"),
        req.body.email,
        req.body.mobile,
        req.body.vcode,
        xAuthToken,
        function(err, result) {
            if(!err && result.success) {
                req.session[CONSTANT.session.xAuthToken] = result.xAuthToken;
                res.redirect("/login");
            } else {
               // ws.error(res);
            }
        }
    );
}



exports.base64Vcode = function(req, res) {
    var xAuthToken = req.session[CONSTANT.session.xAuthToken];
    agent.base64Vcode(xAuthToken, function(err, result) {
        if(!err) {
            req.session[CONSTANT.session.xAuthToken] = result.xAuthToken;
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
    var xAuthToken = req.session[CONSTANT.session.xAuthToken];
    agent["validate" + type].call(agent, value, xAuthToken, function(err, result) {
        if(!err) {
            req.session[CONSTANT.session.xAuthToken] = result.xAuthToken;
           // ws.ok(res, result);
        } else {
           // ws.error(res);
        }
    });
}

exports.logout = function(req, res) {
    var accessToken = req.session[CONSTANT.session.accessInfo].accessToken;
    agent.logout(accessToken, function(err, result) {
        if(!err) {
            if(result.success) {
                req.session[CONSTANT.session.userId] = null;
                res.redirect(CONSTANT.page.login);
            }
        } else {
            res.send(result);
        }
    });
}

exports.authorise = function(req, res, next) {
    if(req.session[CONSTANT.session.userId]) {
        var accessToken = req.session[CONSTANT.session.accessInfo].accessToken;
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