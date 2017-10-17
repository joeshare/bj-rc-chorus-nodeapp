/**
 * Created by Blair
 */
'use strict'
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');
var httClient=require('../utils/httpClient');

var defualtCfg={
    url:CONSTANT.remoteActionUrl,
    contentType:'application/json'
};

var managementInterface = require('../modules/authIntegration/ManagementInterface.js');

// 根据应用程序code获取角色列表（/app/{appCode}/role）
function list(req,res,next){
    //var projectId = req.body.projectId;
    var curProjectRoles = req.body.curProjectRoles;
    console.log("curProjectRoles:",curProjectRoles);
    var roles ;
    if(curProjectRoles && curProjectRoles.length > 0){
        roles = JSON.parse(curProjectRoles);
    }
    //getUserByRoleCode
    var allUser = [];
    var k = 0;
    if(roles.length ===0){
        res.send(null,[]);
    }else{
        getUser();
    }
    function getUser() {
        var rCode = roles[k].code;
        var rName = roles[k].name;
        managementInterface.getUserByRoleCode(rCode,function (err, result) {
            if(err){
                res.send(err);
            }else {
                for(var p=0;p<result.length;p++){

                    allUser.push({
                        code:result[p].code,
                        name:result[p].name,
                        email:result[p].email,
                        updateTime:result[p].updateTime,
                        roleCode: rCode,
                        roleName: rName
                    })
                }
                k++;
                if(k<roles.length){
                    getUser()
                }else {
                    console.log("成员总数：",allUser.length);
                    res.send(allUser);
                }
            }
        });
    }
}

//获取主题下的角色
function getRolesBySubject(req, res, next) {
    var caasTopicId = req.body.caasTopicId;
    managementInterface.getRolesBySubject(caasTopicId,function (err,result) {
        if(err){
            res.send(err);
        }else {
            res.send(result)
        }
    })
}

//获取应用下所有用户
function getAppUser(req, res, next) {
    managementInterface.getAppUser(function (err,result) {
        if(err){
            res.send(err);
        }else {
            res.send(result)
        }
    })
}

function updateRoleOfUser(req, res, next) {
    var userCode = req.body.userCode;
    var roleCodeOld = req.body.roleCodeOld;
    var roleCodeNew = req.body.roleCodeNew;

    var chorusRoleCode = req.body.chorusRoleCode;
    var projectId = req.body.projectId;
    var userName = req.body.userName;
    managementInterface.updateRoleOfUser(userCode,roleCodeOld,roleCodeNew,function (err, result) {
        if(err){
            res.send(err);
        }else{
            console.log('caas 更新成功');
            projectMemberUpdate(projectId,userCode,userName,roleCodeOld,roleCodeNew,chorusRoleCode,res);

        }
    })
}

function deleteUserFromCaas(req, res, next) {
    var userCode = req.body.userCode;
    var userName = req.body.userName;
    var roleCode = req.body.roleCode;
    var projectId = req.body.projectId;
    managementInterface.deleteUserFromCaas(userCode,roleCode,function (err, result) {
        if(err){
            res.send(err);
        }else{
            projectMemberDel(projectId,userCode,userName,roleCode,res);
        }
    })
}

//添加用户并赋角色权限
function addUserAddRole(req, res, next) {
    var userCode = req.body.userCode;
    var roleCode = req.body.roleCode;
    var chorusRoleCode = req.body.chorusRoleCode;
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var projectId = req.body.projectId;
    managementInterface.addUserAddRole(userCode,roleCode,userName,userEmail,function (err, result) {
        if(err){
            res.send(err);
        }else {
            projectMemberNew(projectId,userCode,chorusRoleCode,userName,res)
        }
    })
}

//chorus 新增
function projectMemberNew(projectId,userId,roleId,userName,res) {
    defualtCfg.method="POST";
    let opt=appUtil.extend({},defualtCfg);
    opt.url +="/project/member/new";
    opt.data={
        "projectId": projectId,
        "roleId": roleId,
        "userId": userId,
        "userName":userName
    };
    opt.callBack=function(error, response, body){
        if(error)
        {
            managementInterface.deleteUserFromCaas(userId,roleId,function (err, result) {
                if(err){
                    console.log("chorus 新增数据失败，回滚删除用户也失败。可能会在caas产生垃圾数据！");
                    res.send(err);
                }else{
                    res.send({
                        "code":1,
                        "msg":"chorus新增数据失败，回滚删除用户成功！"
                    });
                }
            })
        }
        else {
            res.send(JSON.parse(body));
        }
    };
    httpClient(opt);
}

function projectMemberUpdate(projectId, userCode,userName,roleCodeOld,roleCodeNew,chorusRoleCode, res) {
    defualtCfg.method = "PUT";
    let opt=appUtil.extend({},defualtCfg);
    opt.url +="/project/member/update";
    opt.data={
        "projectId": projectId,
        "roleId": chorusRoleCode,
        "userId": userCode,
        "userName":userName
    };
    console.log("UUUU:",opt.data);
    opt.callBack=function(error, response, body){
        if(error)
        {
            managementInterface.updateRoleOfUser(userCode,roleCodeNew,roleCodeOld,function (err, result) {
                if(err){
                    console.log('chorus更新失败，回滚失败！');
                    res.send(err);
                }else{
                    res.send({
                        code:1,
                        msg:"chorus更新成员信息失败，回滚成功!"
                    });
                }
            })
        }
        else {
            var r = JSON.parse(body);
            if(r.data && r.data ===0){
                managementInterface.updateRoleOfUser(userCode,roleCodeNew,roleCodeOld,function (err, result) {
                    if(err){
                        console.log('chorus更新失败，回滚失败！');
                        res.send(err);
                    }else{
                        res.send({
                            code:1,
                            msg:"chorus更新成员信息失败，回滚成功!"
                        });
                    }
                })
            }else {
                res.send(r);
            }

        }
    };
    httpClient(opt);
}

function projectMemberDel(projectId,userId,userName,roleCode,res) {
        defualtCfg.method="DELETE";
        let opt=appUtil.extend({},defualtCfg);
        opt.url +="/project/member/del/"+projectId+"/"+userId+"/"+userName;
        opt.callBack=function(error, response, body){
            console.log('chorus 执行删除结果',error,body);
            if(error){
                res.send({
                    "errorCode":1,
                    "errorMessage":"chorus 删除数据失败！"
                });
            }else {
                var r = JSON.parse(body);
                if(r.error){
                    managementInterface.roleToUser(userId,roleCode,function (err, result) {
                        console.log(err,result);
                        res.send({
                            "errorCode":1,
                            "errorMessage":"chorus 删除数据失败，已回滚！"
                        });
                    });

                }else {
                    res.send({
                        "errorCode":0,
                        "errorMessage":r.message
                    });
                }

            }
        }
        httpClient(opt);

}

function userIsInProject(req, res, next) {
    var userCode = req.body.userCode;
    var subjectCode = req.body.subjectCode;
    managementInterface.userIsInProject(subjectCode,userCode,function (err, result) {
        if(err){
            res.send(err);
        }else {
            res.send(result);
        }
    })
}

function getChorusRoles(req,res,next) {

    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+='/role/project/get';
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httClient(opt);
}

function getUserInfoByName(req,res,next){
    managementInterface.getUserInfoByName(req.body,function (err, result) {
        if(err){
            res.send(err);
        }else {
            res.send(result);
        }
    })
}

module.exports={
    list:list,
    getRolesBySubject:getRolesBySubject,
    deleteUserFromCaas:deleteUserFromCaas,
    getAppUser:getAppUser,
    updateRoleOfUser:updateRoleOfUser,
    addUserAddRole: addUserAddRole,
    userIsInProject:userIsInProject,
    getChorusRoles:getChorusRoles,
    getUserInfoByName:getUserInfoByName
}