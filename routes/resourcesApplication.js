//ResourceApplication
var express = require('express');
var router = express.Router();
var rServer = require('../server/resourcesApplicationServer');

// 待审批资源申请列表
router.post('/api/resourcesapplication/pending',function(req,res,next){    
    //console.log('/api/resourcesapplication/pending',req.body);
    rServer.pending(req,res,next);
})
// 已通过资源申请列表
router.post('/api/resourcesapplication/approved',function(req,res,next){
    //console.log('/api/resourcesapplication/approved',req.body);
    rServer.approved(req,res,next);
})

// 已拒绝资源申请列表
router.post('/api/resourcesapplication/denied',function(req,res,next){    
    //console.log('/api/resourcesapplication/denied',req.body);
    rServer.denied(req,res,next);
})

// 审批资源申请
router.post('/api/resourcesapplication/approve',function(req,res,next){
    
    console.log("session::",req.session.__USER_ID__);
    req.body.userId= req.session.__USER_ID__;
    req.body.userName = req.session.__USER_NAME__;
    console.log('/api/resourcesapplication/approve',req.body);
    rServer.approve(req,res,next);
})

// 平台剩余可用资源 暂不提供
// http://10.200.32.95:8080/resource/left
 router.post('/api/resourcesapplication/left',function(req,res,next){
    
     rServer.left(req,res,next);
 })


module.exports = router;