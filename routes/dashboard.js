var express = require('express');
var router = express.Router();
var dashboardServer =require('../server/dashboardServer');
var commonServer = require('../server/commonServer');

/* 资源接口 */
router.post('/api/dashboard/resource', function(req, res, next) {
    dashboardServer.resource(req,res,next);
});
/* 成员数 */
router.post('/api/dashboard/member', function(req, res, next) {
    dashboardServer.member(req,res,next);
});

/* 数据接口 */
router.post('/api/dashboard/data', function(req, res, next) {
    dashboardServer.data(req,res,next);
});


/* 任务分布 */
router.post('/api/dashboard/task', function(req, res, next) {
    dashboardServer.task(req,res,next);
});

/* 批量任务分布 */
router.post('/api/dashboard/batchtask', function(req, res, next) {
    dashboardServer.batchtask(req,res,next);
});

/* 流式任务分布 */
router.post('/api/dashboard/streamtask', function(req, res, next) {
    dashboardServer.streamtask(req,res,next);
});

/* 执行时间分布 */
router.post('/api/dashboard/exectime', function(req, res, next) {
    dashboardServer.exectime(req,res,next);
});

module.exports = router;
