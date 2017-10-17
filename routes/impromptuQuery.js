var express = require('express');
var router = express.Router();
var impromptuServer =require('../server/impromptuQueryServer');
var commonServer = require('../server/commonServer');

/* 树型结构接口  同步速度慢 被treeasync 异步替换*/
router.post('/api/impromptuquery/tree', function(req, res, next) {
    impromptuServer.getTree(req,res,next);
});
router.post('/api/impromptuquery/treeroot', function(req, res, next) {
    impromptuServer.getTreeRoot(req,res,next);
});
router.post('/api/impromptuquery/treeasync', function(req, res, next) {
    impromptuServer.getTreeAsync(req,res,next);
});
/* 执行结果 */
router.post('/api/impromptuquery/result', function(req, res, next) {
    impromptuServer.result(req,res,next);
});

/* 执行历史 */
router.post('/api/impromptuquery/history', function(req, res, next) {
    impromptuServer.history(req,res,next);
});

module.exports = router;
