var express = require('express');
var router = express.Router();
var dataLabServer = require('../server/dataLaboratory');
var commonServer = require('../server/commonServer');
var sessionAgent = require('../utils/sessionAgent');

/* 获取项目列表  项目信息使用前端获取方式，此方法逐步废除*/
router.post('/api/datalaboratory/datalab/projectlist', function(req, res, next) {
    var projectInfo =sessionAgent.getCurrentProjectInfo(req);
    console.log("projectInfo:",projectInfo);
    var pInfo ={};
    if(projectInfo){
         pInfo ={
            "projectId":projectInfo.projectId,
            "projectCode":projectInfo.projectCode,
            "projectName":projectInfo.projectName,
            "caasTopicId":projectInfo.caasTopicId
         };
    }else {
        pInfo ={
            "projectId":'',
            "projectCode":'',
            "projectName":'',
            "caasTopicId":''
        };
    }



    res.send(pInfo)
});

/* 获取项目列表 */
router.post('/api/datalaboratory/datalab/allproject', function(req, res, next) {
    commonServer.projectList(req,res,next);
});

router.post('/api/datalaboratory/getdatalablist',function(req,res,next){
    console.log("api/datalaboratory/getDataLablist:",req.body);
    dataLabServer.getDataLabList(req,res,next);    
});

router.post('/api/datalaboratory/create',function(req,res,next){
    console.log('/api/datalaboratory/create',req.body);
    req.body["createUserName"] = req.session.__USER_NAME__;    
    dataLabServer.createDataLab(req,res,next);
})


router.post('/api/datalaboratory/delete',function(req,res,next){
    console.log('/api/datalaboratory/delete',req.body);
    dataLabServer.deleteDataLab(req,res,next);
})

router.post('/api/datalaboratory/start',function(req,res,next){
    console.log('/api/datalaboratory/start',req.body);
    dataLabServer.startDataLab(req,res,next);
})

router.post('/api/datalaboratory/stop',function(req,res,next){
    console.log('/api/datalaboratory/stop',req.body);
    dataLabServer.stopDataLab(req,res,next);
})

router.post('/api/datalaboratory/alive',function(req,res,next){
    console.log('/api/datalaboratory/alive',req.body);
    dataLabServer.aliveDataLab(req,res,next);
})
module.exports=router;
