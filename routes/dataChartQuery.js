var express = require('express');
var router = express.Router();
var grapdataServer =require('../server/dataChartQueryServer');
var commonServer = require('../server/commonServer');

/* 获取项目列表 */
router.post('/api/datachartquery/projectlist', function(req, res, next) {
    commonServer.projectList(req,res,next);
});

/* 通过点名称模糊查询点列表	 */
router.post('/api/datachartquery/getvertexlistbyname', function(req, res, next) {
    grapdataServer.getVertexListByName(req,res,next);
});

/* 	通过点ID查询所有属性	 */
router.post('/api/datachartquery/getpropertybyvertexid', function(req, res, next) {
    grapdataServer.getPropertyByVertexId(req,res,next);
});

/* 	获取图数据	 */
router.post('/api/datachartquery/vertexedgelist', function(req, res, next) {
    console.log('---------post11----')
    grapdataServer.vertexedgelist(req,res,next);
});

module.exports = router;