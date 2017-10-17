/**
 * Created by Blair on 2017/4/10.
 */

var express = require('express');
var router = express.Router();
var rServer = require('../server/externalResourceServer');
var agent = require('../utils/sessionAgent');

router.post('/api/externalresource/pagelist',function(req,res,next){
    console.log('/api/externalresource/pagelist',req.body);

    rServer.list(req,res,next);
})

router.post('/api/externalresource/add',function(req,res,next){
    req.body.userId = agent.getUserId(req);
    req.body.createUserName = agent.getUserName(req);
    console.log('/api/externalresource/add',req.body);
    rServer.add(req,res,next);
})

router.post('/api/externalresource/delete',function(req,res,next){
    console.log('/api/externalresource/delete',req.body);

    rServer.delete(req,res,next);
})

router.post('/api/externalresource/update',function(req,res,next){
    console.log('/api/externalresource/update',req.body);
    req.body.updateUserId= agent.getUserInfo(req).user_code
    rServer.update(req,res,next);
})
router.post('/api/externalresource/detail',function(req,res,next){
    console.log('/api/externalresource/detail',req.body);

    rServer.detail(req,res,next);
})
//测试数据库连接
router.post('/api/externalresource/testconnection',function(req,res,next){
    console.log('/api/externalresource/testconnection',req.body);
    rServer.testconnection(req,res,next);
})


module.exports = router;
