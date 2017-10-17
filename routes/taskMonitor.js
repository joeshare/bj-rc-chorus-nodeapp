var express = require('express');
var router = express.Router();
var taskMonitorServer = require('../server/taskMonitorServer');
router.post('/api/taskmonitor/jobmonitorlist', function(req, res, next) {
  taskMonitorServer.jobMonitorList(req, res, next);
});
router.post('/api/taskmonitor/getsubjobmonitorlist', function(req, res, next) {
  taskMonitorServer.getSubJobMonitorList(req, res, next);
});
router.post('/api/taskmonitor/downloadfile', function(req, res, next) {
  taskMonitorServer.downloadFile(req, res, next);
});
router.post('/api/taskmonitor/streammonitorlist', function(req, res, next) {
  taskMonitorServer.streamMonitorList(req, res, next);
});
router.post('/api/taskmonitor/restartjob', function(req, res, next) {
  taskMonitorServer.restartJob(req, res, next);
});
router.post('/api/taskmonitor/streammonitordetail', function(req, res, next) {
  taskMonitorServer.streamMonitorDetail(req, res, next);
});


module.exports = router;
