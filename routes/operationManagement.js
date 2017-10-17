/**
 * Created by AnThen on 2017-9-19.
 */
var express = require('express');
var router = express.Router();
var server = require('../server/operationManagementServer');

//维护状态改变
router.post('/api/operationmanagement/changestatus',function(req,res,next){
    server.changeOperationStatus(req,res,next)
})
//待执行任务执行
router.post('/api/operationmanagement/fetchpendingjob',function(req,res,next){
    server.fetchPendingJob(req,res,next)
})
//获取维护状态
router.post('/api/operationmanagement/fetchstatus',function(req,res,next){
    console.log('/api/operationmanagement/fetchstatus')
    server.fetchOperationStatus(req,res,next)
})
module.exports = router;