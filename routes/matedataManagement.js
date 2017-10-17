var express = require('express');
var router = express.Router();
var metadataServer = require('../server/metadataServer');
//列表
router.post('/api/metadatamanagement/list', function(req, res, next) {
  metadataServer.list(req, res, next);
});
//基本信息
router.post('/api/metadatamanagement/querymatedatatable', function(req, res, next) {
  metadataServer.querymatedatatable(req, res, next);
});
//字段信息
router.post('/api/metadatamanagement/querymatedatacolumninfo', function(req, res, next) {
  metadataServer.querymatedatacolumninfo(req, res, next);
});
//样列数据
router.post('/api/metadatamanagement/querymatesampledata', function(req, res, next) {
  metadataServer.querymatesampledata(req, res, next);
});
//申请权限 
router.post('/api/metadatamanagement/querypowerapply', function(req, res, next) {
  metadataServer.querypowerapply(req, res, next);
});
//权限列表
router.post('/api/metadatamanagement/querypowerlist', function(req, res, next) {
  metadataServer.querypowerlist(req, res, next);
});
//血缘关系
router.post('/api/metadatamanagement/fetchblood', function(req, res, next) {
  metadataServer.fetchblood(req, res, next);
});
//所有表
router.post('/api/metadatamanagement/alltable', function(req, res, next) {
  metadataServer.alltable(req, res, next);
});

module.exports = router;
