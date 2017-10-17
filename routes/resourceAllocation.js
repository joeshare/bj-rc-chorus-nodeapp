//ResourceAllocation
var express = require('express');
var router = express.Router();
var rServer = require('../server/resourceAllocationServer');

//获取容器列表 根据项目ID
router.post('/api/resourceallocation/getresourceallocation',function(req,res,next){
    console.log('/api/resourceallocation/getresourceallocation',req.body);
    rServer.getResourceAllocation(req,res,next);
})

//获取申请历史
router.post('/api/resourceallocation/getprosecution',function(req,res,next){
    console.log('/api/resourceallocation/getprosecution',req.body);
    //console.log("session::",req.session.__USER_ID__);
    rServer.getProsecution(req,res,next);
})
 

//申请资源
router.post('/api/resourceallocation/addprosecution',function(req,res,next){
    console.log('/api/resourceallocation/addprosecution',req.body);
    req.body.userId= req.session.__USER_ID__;
    req.body.userName = req.session.__USER_NAME__;//
    rServer.addProsecution(req,res,next);
})

//创建容器
router.post('/api/resourceallocation/addresourceallocation',function(req,res,next){
    req.body.environmentIdList = JSON.parse(req.body.environmentIdList);
    console.log('/api/resourceallocation/addresourceallocation',req.body);
    req.body.userId= req.session.__USER_ID__;
    req.body.userName = req.session.__USER_NAME__;//
    rServer.addResourceAllocation(req,res,next);
})

//操作容器状态
router.post('/api/resourceallocation/opercon',function(req,res,next){
    console.log('/api/resourceallocation/opercon',req.body);
    req.body.userId= req.session.__USER_ID__;
    req.body.userName = req.session.__USER_NAME__;//
    rServer.operCon(req,res,next);
})

//获取模板
router.post('/api/resourceallocation/getreourcetemplae',function(req,res,next){
    console.log('/api/resourceallocation/getreourcetemplae');
    rServer.getReourceTemplae(req,res,next);
})
//容器调整
router.post('/api/resourceallocation/adjust',function(req,res,next){
    console.log('/api/resourceallocation/adjust');
    req.body.userId= req.session.__USER_ID__;
    req.body.userName = req.session.__USER_NAME__;//
    rServer.reourceAdjust(req,res,next);
})

//获取环境列表
router.post('/api/resourceallocation/environment',function(req,res,next){
    console.log('/api/resourceallocation/environment');
    rServer.reourceEnvironment(req,res,next);
})

//获取可用资源
router.post('/api/resourceallocation/availableresource',function(req,res,next){
    console.log('/api/resourceallocation/availableresource');
    rServer.availableResource(req,res,next);
})

//获取容器启动状态
router.post('/api/resourceallocation/getinfo',function(req,res,next){
    console.log('/api/resourceallocation/getinfo',req.body);
    rServer.getInfo(req,res,next);
})

module.exports = router;
