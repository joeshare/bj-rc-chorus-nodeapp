var express = require('express');
var router = express.Router();
var server = require('../server/dataComponentManagementServer');
router.post('/api/resourcesapplication/getprojects', function(req, res, next) {
  server.getProjects(req, res, next);
});

router.post('/api/resourcesapplication/getlistdata', function(req, res, next) {
  server.getListData(req, res, next);
});



module.exports = router;
