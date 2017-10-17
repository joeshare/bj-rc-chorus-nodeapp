var express = require('express');
var router = express.Router();
var grapdataServer =require('../server/grapdatamangeserver');
var commonServer = require('../server/commonServer');

/* 获取图数据列表 */
router.post('/api/graphdatamanagement/getgraphinfolist', function(req, res, next) {
    grapdataServer.getGraphInfoList(req,res,next);
});
/* 添加图数据 */
router.post('/api/graphdatamanagement/graphinfocreate', function(req, res, next) {
    grapdataServer.graphInfoCreate(req,res,next);
});

/* 获取图数据详情 */
router.post('/api/graphdatamanagement/getgraphinfodetails', function(req, res, next) {
    grapdataServer.getGraphInfoDetails(req,res,next);
});

/* 获取数据类型字典列表 */
router.post('/api/graphdatamanagement/getdatatypelist', function(req, res, next) {
    grapdataServer.getDatatypeList(req,res,next);
});

/* 获取项目列表 */
router.post('/api/graphdatamanagement/projectlist', function(req, res, next) {
    commonServer.projectList(req,res,next);
});

/* 通过点名称模糊查询点列表	 */
router.post('/api/graphdatamanagement/getvertexlistbyname', function(req, res, next) {
    grapdataServer.getVertexListByName(req,res,next);
});
/* 所有点列表	 */
router.post('/api/graphdatamanagement/getallvertex', function(req, res, next) {
    grapdataServer.getAllVertex(req,res,next);
});



/* 	校验数据Code	 */
router.post('/api/graphdatamanagement/verifydatacode', function(req, res, next) {
    grapdataServer.verifyDataCode(req,res,next);
});

module.exports = router;
