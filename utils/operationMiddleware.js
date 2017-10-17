/**
 * 运维中间件 
 */

var CONSTANT = require("../config/constant.js");
var sessionAgent = require("./sessionAgent.js");
var redisServer = require("./redisServer.js");
var authInterface = require('../modules/authIntegration/AuthenticationInterface.js');
var chorusRolee=null;
function hasPlatfform(req){
   chorusRolee=sessionAgent.getChorusRoleCode(req);
   console.log('chorusRolee',chorusRolee)
   if(!chorusRolee){ return false; }
   return !chorusRolee.every(r=>{
     return r.name!=='platform';
   })
}
/**
 * 检查
 * @param opt
 * @returns {Function}
 */
function checkout(opt){
    console.log('checkout---')
    return function(req, res, next){
        if (CONSTANT.sessionWhiteList.indexOf(req.path.toLowerCase()) > -1) {
            console.log('---usessionWhiteList')
            // console.log("authentication whiteList")
            next();
            return;
        }
        if(!req.session||!sessionAgent.getUserId(req)){
            res.send({code:CONSTANT.code.sessionOut, msg: 'session time out'})
            return;
        }
        console.log("hasPlatfform(req)",hasPlatfform(req))
        if(hasPlatfform(req)){
            console.log('88888---userResource')
            next();
            return;
        }
        redisServer.get(opt.operationStatusCode, function (err, result) {
            if(err){
                next(new Error(err));
            }else{
                console.log("operation status checkout ",result);
                if(`${result}`=='1'){//进入维护状态
                    res.send({code:CONSTANT.code.operationStatus,msg:'operation status start'})
                }else{
                    next()
                }
            }
        });
   }
}
exports.checkout = checkout;