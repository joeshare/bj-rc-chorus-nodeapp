var express = require('express');
var router = express.Router();
var dashboardServer =require('../server/admindashboardServer');
var commonServer = require('../server/commonServer');

/* TOPData */
router.post('/api/admindashboard/top', function(req, res, next) {
    dashboardServer.top(req,res,next);
});


/* 使用率 */
router.post('/api/admindashboard/userate', function(req, res, next) {
    dashboardServer.userate(req,res,next);
});

/* 数据量 */
router.post('/api/admindashboard/datasize', function(req, res, next) {
    dashboardServer.datasize(req,res,next);
});

/* 成功率 */
router.post('/api/admindashboard/successrate', function(req, res, next) {
    dashboardServer.successrate(req,res,next);
});

/* KPI */
router.post('/api/admindashboard/kpi', function(req, res, next) {
    dashboardServer.kpi(req,res,next);
});

/* exectags */
router.post('/api/admindashboard/exectags', function(req, res, next) {
    dashboardServer.exectags(req,res,next);
});

module.exports = router;
