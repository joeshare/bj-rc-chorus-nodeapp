var express = require('express');
var router = express.Router();
var datatableServer = require('../server/datatableServer');
//列表
router.post('/api/datatablemanagement/list', function(req, res, next) {
  datatableServer.list(req, res, next);
});

//基本信息
router.post('/api/datatablemanagement/baseinfo', function(req, res, next) {
  datatableServer.baseinfo(req, res, next);
});

//增加
router.post('/api/datatablemanagement/add', function(req, res, next) {
  datatableServer.add(req, res, next);
});

//修改
router.post('/api/datatablemanagement/update', function(req, res, next) {
  datatableServer.update(req, res, next);
});


//删除
router.post('/api/datatablemanagement/delete', function(req, res, next) {
  datatableServer.delete(req, res, next);
});

//属性信息
router.post('/api/datatablemanagement/propertylist', function(req, res, next) {
  datatableServer.propertylist(req, res, next);
});
//字段类型信息
router.post('/api/datatablemanagement/gethivetypes', function(req, res, next) {
  datatableServer.getHiveTypes(req, res, next);
});

//rdb
router.post('/api/datatablemanagement/external_datasource/rdb', function(req, res, next) {
  datatableServer.rdb(req, res, next);
});

//table
router.post('/api/datatablemanagement/external_datasource/table', function(req, res, next) {
  datatableServer.table(req, res, next);
});

//field
router.post('/api/datatablemanagement/external_datasource/field', function(req, res, next) {
  datatableServer.field(req, res, next);
});
module.exports = router;
