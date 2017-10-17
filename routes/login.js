var express = require('express');
var router = express.Router();
var loginServer = require('../server/loginServer');

/* POST api. */
router.post('/api/login/entry', function(req, res, next) {
  loginServer.login(req, res);
});
router.post('/api/logout', function(req, res, next) {
  loginServer.logout(req, res);
});
//注意，这里使用projectmanagement项目管理页面，
//因为：
//1、项目管理页面是任何人都可以有的页面没有权限限制
//2、这个路径请求必修是登录后才可以使用，
router.post('/api/projectmanagement/fetchoperationstatus', function(req, res, next) {
  loginServer.fetchOperationStatus(req, res, next);
});
module.exports = router;
