var express = require('express');
var router = express.Router();
var CONTANT = require('../config/constant');
var authServer = require('../server/authServer');
var menuServer = require('../server/menuServer');
var authInterface = require('../modules/authIntegration/AuthenticationInterface.js');
var rsaconfig = require('../config/rsaConfig');

/**
 * 如果Session验证失败，跳转到登录页面
 * 如果Session验证成功，继续执行
 */
router.all('/*', function (req, res, next) {
    if(req.method == 'GET'){
        res.sendStatus(404);
        return;
    }
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    if(CONTANT.appStatus=='development'){
        next();
        return;
    }

    console.log('req.path.toLowerCase()',req.path.toLowerCase())

    console.log('CONTANT.sessionWhiteList',CONTANT.sessionWhiteList)

    if (CONTANT.sessionWhiteList.indexOf(req.path.toLowerCase()) > -1) {
       // console.log("authentication whiteList")
        next();
        return;
    }
    //session 检查
    authServer.checkSession(req, res, next);
});

/**
 * 资源权限验证
 */
router.all('/api/(:pageId|:pageId/*)', function (req, res, next) {
    if (CONTANT.accessWhiteList.indexOf("/"+req.params.pageId) >-1) {
        //console.log("access whiteList")
        next();
        return;
    }
    //访问权限 检查
    authServer.checkAccess(req, res, next,"/"+req.params.pageId);
});
router.post(/^\/api\/(getMenus)/,function(req, res, next) {
    menuServer.getMenus(req, res);
});
router.post(/^\/api\/(refreshauth)/,function(req, res, next) {
    authInterface.batchCheckAuth(req, res);
});
router.post('/api/getUserInfo',function(req, res, next) {
    authInterface.getUserInfo(req, res, next);
});

router.post('/api/getPublicKey', function(req, res, next) {
    res.send({'publickey':rsaconfig.getpublickey()});
});
module.exports = router;
