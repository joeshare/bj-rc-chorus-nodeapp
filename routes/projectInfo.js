var express = require('express');
var router = express.Router();
var projectInfoServer = require('../server/projectInfoServer');
//列表
router.post('/api/projectmanagement/list', function(req, res, next) {
  projectInfoServer.fetchList(req, res, next);
});
//下拉列表
router.post('/api/projectmanagement/selectlist', function(req, res, next) {
  projectInfoServer.selectfetchList(req, res, next);
});
//基本信息
router.post('/api/projectmanagement/baseinfo', function(req, res, next) {
  projectInfoServer.fetchInfo(req, res, next);
});

router.post('/api/projectmanagement/modifyproject', function(req, res, next) {
  projectInfoServer.modifyProject(req, res, next);
});
//增加项目
router.post('/api/projectmanagement/addinfo', function(req, res, next) {
  projectInfoServer.createProject(req, res, next);
});
//成员信息
router.post('/api/projectmanagement/memberinfo', function(req, res, next) {
  projectInfoServer.memberinfo(req, res, next);
});
//资源配置
router.post('/api/projectmanagement/rescfg', function(req, res, next) {
  projectInfoServer.rescfg(req, res, next);
});
//外部资源
router.post('/api/projectmanagement/externalres', function(req, res, next) {
  projectInfoServer.externalres(req, res, next);
});

//所剩资源
router.post('/api/projectmanagement/getleft', function(req, res, next) {
  projectInfoServer.getleft(req, res, next);
});

router.post('/api/projectmanagement/changeproject',function(req, res, next) {
  projectInfoServer.changeproject(req, res, next);
});

router.post('/api/projectmanagement/deleteproject',function(req, res, next) {
  projectInfoServer.deleteproject(req, res, next);
});



module.exports = router;
