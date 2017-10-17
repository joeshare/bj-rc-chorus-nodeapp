var express = require('express');
var router = express.Router();
var dataaccessServer = require('../server/dataaccessServer');
//列表
router.post('/api/dataaccessmanagement/select_application', function(req, res, next) {
  dataaccessServer.select_application(req, res, next);
});

//待申请处理
router.post('/api/dataaccessmanagement/approve', function(req, res, next) {
  dataaccessServer.approve(req, res, next);
});

//详情
router.post('/api/dataaccessmanagement/application_detail', function(req, res, next) {
  dataaccessServer.application_detail(req, res, next);
});

module.exports = router;
