/**
 * Created by AnThen on 2017-4-1.
 */
var authInterface = require("./AuthenticationInterface.js");
var CONSTANT = require("../../config/constant.js");
const defaultRootNode=['projectmanagement-module', 'dmp', 'marketing', 'insight'];
var sessionAgent = require("../../utils/sessionAgent.js");
var redisServer = require("../../utils/redisServer.js");
var subjectuntils = require('./SubjectInterface');
var projectuntils = require('../../server/projectInfoServer');
var adminlogin = require('./adminloginInterface');
var roleconfig = require('../../config/roleConfig');
const defaultMenus = {
    'projectmanagement-module': [{
        index:1,
        level: 1,
        parent: 'root',
        id: 'projectmanagement-module',
        'text': '项目管理',
        'url': '',
        'iconClass':'ion-archive',
        'collapse':false,
        active: false,
        children: [

            {
                level: 2,
                parent: 'projectmanagement-module',
                id: '/dashboard',
                text: 'Dashboard',
                active: false,
                'collapse':false,
                url:'/dashboard'
            },{
            level: 2,
            parent: 'projectmanagement-module',
            id: '/projectmanagement',
            active: false,
            'text': '项目管理',
            'url': '/projectmanagement',
            'collapse':false,
            'children': []
        },{
                level: 2,
                parent: 'projectmanagement-module',
                id: '/membermanagement',
                text: '成员管理',
                active: false,
                'collapse':false,
                url:'/membermanagement'
            },
            {
                level: 2,
                parent: 'projectmanagement-module',
                id: '/resourceallocation',
                text: '资源配置',
                active: false,
                'collapse':false,
                url:'/resourceallocation'
            },
            {
                level: 2,
                parent: 'projectmanagement-module',
                id: '/externalresource',
                text: '外部资源配置',
                active: false,
                'collapse':false,
                url:'/externalresource'
            }]
    }],
    'datamanagement-module': [{
        index:2,
        level: 1,
        parent: 'root',
        id: 'datamanagement-module',
        text: '数据管理',
        'iconClass':'ion-clipboard',
        'collapse':true,
        active: false,
        children: [{
            level: 2,
            parent: 'datamanagement-module',
            id: '/datatablemanagement',
            active: false,
            'text': '数据表管理',
            'url': '/datatablemanagement',
            'collapse':false
        },
            {
                level: 2,
                parent: 'datamanagement-module',
                id: '/metadatamanagement',
                text: '元数据查询',
                active: false,
                url:'/metadatamanagement',
                'collapse':false
            },
            {
                level: 2,
                parent: 'datamanagement-module',
                id: '/dataaccessmanagement',
                text: '数据权限管理',
                active: false,
                url:'/dataaccessmanagement',
                'collapse':false
            },{
                level: 2,
                parent: 'datamanagement-module',
                id: '/graphdatamanagement',
                text: '图数据管理',
                active: false,
                url:'/graphdatamanagement',
                'collapse':false
            }]
    }],
    'dataanalyse-module': [{
        index:3,
        level: 1,
        parent: 'root',
        id: 'dataanalyse-module',
        text: '数据分析',
        active: false,
        'iconClass':'ion-stats-bars',
        'url': '',
        'collapse':true,
        children: [
            {
                level: 2,
                parent: 'dataanalyse-module',
                id: '/impromptuquery',
                text: '即席查询',
                active: false,
                'collapse':false,
                url:'/impromptuquery'
            },
            {
                level: 2,
                parent: 'dataanalyse-module',
                id: '/datachartquery',
                text: '数据图谱',
                active: false,
                'collapse':false,
                url:'/datachartquery'
            },
            {
                level: 2,
                parent: 'dataanalyse-module',
                id: '/datalaboratory',
                text: '数据实验室',
                active: false,
                'collapse':false,
                url:'/datalaboratory'
            }
        ]
    }],
    'datadevelopment-module': [{
        index:4,
        level: 1,
        parent: 'root',
        id: 'datadevelopment-module',
        text: '数据开发',
        active: false,
        'iconClass':'ion-wrench',
        'url': '',
        'collapse':true,
         children: [
            {
                level: 2,
                parent: 'datadevelopment-module',
                id: '/taskdevelopment',
                text: '任务开发',
                active: false,
                'collapse':false,
                url:'/taskdevelopment'
            },{
                level: 2,
                parent: 'datadevelopment-module',
                id: '/taskmonitor',
                text: '任务监控',
                active: false,
                'collapse':false,
                url:'/taskmonitor'
            }
        ]
    }],
    'platformmanagement-module': [{
        index:5,
        level: 1,
        parent: 'root',
        id: 'platformmanagement-module',
        text: '平台管理',
        active: false,
        'iconClass':'ion-monitor',
        'url': '',
        'collapse':true,
        children: [
            {
                level: 2,
                parent: 'platformmanagement-module',
                id: '/admindashboard',
                text: 'Dashboard',
                active: false,
                'collapse':false,
                url:'/admindashboard'
            },
            {
                level: 2,
                parent: 'platformmanagement-module',
                id: '/resourcesapplication',
                text: '资源申请处理',
                active: false,
                'collapse':false,
                url:'/resourcesapplication'
            },
            {
                level: 2,
                parent: 'platformmanagement-module',
                id: '/datacomponentmanagement',
                text: '数据组件管理',
                active: false,
                'collapse':false,
                url:'/datacomponentmanagement'
            },
            {
                level:2,
                parent: 'platformmanagement-module',
                id: '/operationmanagement',
                text: '运维管理',
                active: false,
                'collapse':false,
                url:'/operationmanagement'

             }
        ]
    }]
}
function transformMenus(resource_codes,isMaintained){
    var moduleArr=[],pageArr=[],resMenus=[];
    if(resource_codes&&resource_codes.length){
        resource_codes.forEach(function(menu,i){
            if(menu.indexOf("-module")>0){
                moduleArr.push(menu);
            }else{
                pageArr.push(menu);
            }
        })
        var clone=JSON.parse(JSON.stringify(defaultMenus));
        //判断是否是在维护中，如果是就值保留平台管理菜单
        if(isMaintained){
            for(var key in clone){
               if(key=='platformmanagement-module'){
                   continue;
               } else{
                   delete clone[key];
               }
            }
        }
        moduleArr.forEach(function(moduleKey,i){
            var moduleData=clone[moduleKey];
            if(moduleData){
                var newMenu=moduleData[0].children.filter(function(subMenu,i){
                    return pageArr.indexOf(subMenu.id)>-1
                })
                moduleData[0].children=newMenu;
                resMenus.push(moduleData[0])
            }
        })
        resMenus = resMenus.sort(function(a, b) {
            var x = a['index']; var y = b['index'];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        return resMenus;
    }else{
        return resMenus;
    }
}
exports.getMenus = function(req, res) {
    redisServer.get(CONSTANT.operationStatusCode,function(err,redisRes){
        var isMaintained=false;
        if(!err){
            isMaintained=`${redisRes}`=='1';
        }
        if(CONSTANT.appStatus=="debug"){
            res.send({code:0,msg:"success",data:{token_refresh_flag:new Date().getTime(),resource_codes:CONSTANT.accessArr,menus:transformMenus(CONSTANT.accessArr,isMaintained)}});
            return;
        }
    
        getcurrentMenuList(req,res, function(err, result) {
            if(!err) {
                sessionAgent.setUserResource(req,result.resource_codes)
                res.send({code:0,msg:"success",data:{token_refresh_flag:result.token_refresh_flag,resource_codes:result.resource_codes,menus:transformMenus(result.resource_codes,isMaintained)}})
            } else {
                res.send({code:err.code,msg:"batchCheckAuth failure"});
            }
        })
    })
    
}

//获取当前用户所有权限资源
getcurrentMenuList= function (req, res,cb) {
    if(req.body.valueobje)
    {
        console.log('getcurrentMenuList',req.body.valueobje)
        getcurrentprojectinfo(req,JSON.parse(req.body.valueobje).value,cb);
    }
    else {
        projectuntils.getcurrentProjectInfo(req,function (error,result) {
            getcurrentprojectinfo(req,result,cb);
        });
    }

}

getcurrentprojectinfo= function(req,result,cb){
    var retobject ={
        "token_refresh_flag":[],
        "resource_codes":[]
    }
    var usercode  =sessionAgent.getUserId(req);
    if(result){
        var subjectCode=  result.caasTopicId;
        retobject.resource_codes=[];
        adminlogin.login(function (error,loginresult) {
            console.log(loginresult)
            var sessid = loginresult.jSessionId;
            if(!error){
                require("async").parallel({
                    currentSubject : function(notice) {
                        console.log('subjectuntils params',usercode,subjectCode,sessid)
                        subjectuntils.getRoleListByUser(usercode,subjectCode,sessid,function (error,subjectresult) {
                            console.log('subjectuntils error',error)
                            notice(error,subjectresult);
                        })
                    },
                    chorusSubject:function(notice){
                        console.log('chorusSubject params',usercode,CONSTANT.chorusSubjectCode,sessid)
                        subjectuntils.getRoleListByUser(usercode,CONSTANT.chorusSubjectCode,sessid,function (error,subjectresult) {
                            console.log('chorusSubject error',error)
                            notice(error,subjectresult);
                        })
                    }
                }, function(asyncerr, results) {
                    if(!asyncerr){
                        console.log("results.currentSubject",JSON.stringify(results.currentSubject))
                        console.log("results.chorusSubject",JSON.stringify(results.chorusSubject))
                        var resArr=results.currentSubject.concat(results.chorusSubject);

                        if(resArr.length&&resArr.length>0)

                        {
                            resArr.forEach((roles)=>{
                                roles.resources.forEach((subj)=>{
                                    if(retobject.resource_codes.indexOf(subj.identifier)==-1)
                                    {
                                        retobject.resource_codes.push(subj.identifier);
                                    }
                                })
                            })
                        }
                        else {
                            roleconfig.syscfg[1].rlist.forEach((role=>{
                                retobject.resource_codes.push(role.resouce);
                            }));
                        }

                        cb&&cb(null,retobject);
                    }else{
                        console.log("------------------------------------error",asyncerr)
                        roleconfig.syscfg[1].rlist.forEach((role=>{
                            retobject.resource_codes.push(role.resouce);
                        }));
                        cb&&cb(null,retobject);
                    }
                });
            }
            else {
                roleconfig.syscfg[1].rlist.forEach((role=>{
                    retobject.resource_codes.push(role.resouce);
                }));

                cb&&cb(null,retobject);
            }
        })
    }
    else {
        roleconfig.syscfg[1].rlist.forEach((role=>{
            retobject.resource_codes.push(role.resouce);
        }));
        cb&&cb(null,retobject);
    }
}