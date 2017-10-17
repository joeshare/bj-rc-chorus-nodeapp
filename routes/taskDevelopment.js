var express = require('express');
var router = express.Router();
var taskdevelopmentServer = require('../server/taskDevelopmentServer');
router.post('/api/taskdevelopment/getxdmodules', function(req, res, next) {
  taskdevelopmentServer.getXdModules(req, res, next);
});
router.post('/api/taskdevelopment/getmoduleproperty', function(req, res, next) {
  taskdevelopmentServer.getModuleProperty(req, res, next);
});
router.post('/api/taskdevelopment/jobsave', function(req, res, next) {
  taskdevelopmentServer.jobSave(req, res, next);
});
router.post('/api/taskdevelopment/getinstance', function(req, res, next) {
  taskdevelopmentServer.getInstance(req, res, next);
});
router.post('/api/taskdevelopment/jobdeploy', function(req, res, next) {
  taskdevelopmentServer.jobDeploy(req, res, next);
});
router.post('/api/taskdevelopment/jobundeploy', function(req, res, next) {
  taskdevelopmentServer.jobUndeploy(req, res, next);
});
router.post('/api/taskdevelopment/jobdeljob', function(req, res, next) {
  taskdevelopmentServer.jobDelJob(req, res, next);
});
router.post('/api/taskdevelopment/getjobinfo', function(req, res, next) {
  taskdevelopmentServer.getJobInfo(req, res, next);
});
router.post('/api/taskdevelopment/jobvalidcronwithinterval', function(req, res, next) {
  taskdevelopmentServer.jobValidCronWithInterval(req, res, next);
});
router.post('/api/taskdevelopment/jobvalidjobaliasname', function(req, res, next) {
  taskdevelopmentServer.jobValidJobAliasName(req, res, next);
});
router.post('/api/taskdevelopment/getprojectjobs', function(req, res, next) {
  taskdevelopmentServer.getProjectJobs(req, res, next);
});
router.post('/api/taskdevelopment/jobdeployinfo', function(req, res, next) {
  taskdevelopmentServer.jobDeployInfo(req, res, next);
});
router.post('/api/taskdevelopment/validatetaskname', function(req, res, next) {
  taskdevelopmentServer.validateInfoTaskName(req, res, next);
});
router.post('/api/taskdevelopment/excutejob', function(req, res, next) {
  taskdevelopmentServer.excuteJob(req, res, next);
});
router.post('/api/taskdevelopment/getprojecttables', function(req, res, next) {
  taskdevelopmentServer.getProjectTables(req, res, next);
});
router.post('/api/taskdevelopment/getsourcedata', function(req, res, next) {
  taskdevelopmentServer.getSourceData(req, res, next);
});
module.exports = router;
