/**
 管理员接口
 */
var querystring = require("querystring");
var CONSTANT = require("../../config/constant.js");
var loginAdmin = require("./adminloginInterface");

function _get(path, callback,jSessionId) {
    loginAdmin.rq(path, "GET", null, jSessionId, callback);
}

function _post(path, data, callback, jSessionId) {
    data = JSON.stringify(data);
    console.log(path,data,jSessionId);
    loginAdmin.rq(path, "POST", data, jSessionId, callback);
}

function _delete(path, data, callback, jSessionId) {
    console.log(path,data,jSessionId);
    data = JSON.stringify(data);
    loginAdmin.rq(path, "DELETE", data, jSessionId, callback);
}

function _put(path, data, callback, jSessionId) {
    data = JSON.stringify(data);
    console.log(path,data,jSessionId);
    loginAdmin.rq(path, "PUT", data, jSessionId, callback);
}


//1.2 获取应用下的所有用户(从IPA通过过来的用户)
getAppUser:function getAppUser(callback) {
    loginAdmin.login(function (err, r) {
        if(err){
            callback(err);
        }else{
            _post("/admin/app/"+CONSTANT.chorusAppId+"/user",{
                "pageNo":1,
                "pageSize":1000000
            }, function(error, result) {
                if(error){
                    callback(error);
                }else{
                    callback(null, result);
                }
            },r.jSessionId);

        }
    })
}


//获取项目的用户列表
getUserList:function getUserList(projectId,callback){
    loginAdmin.login(function (err, r) {
        if(err){
            callback(err);
        }else{
            _get("/admin/subject/"+projectId+"/user", function(error, result) {
                if(error){
                    callback(error);
                }else{
                    callback(null, result);
                }
            },r.jSessionId);
        }
    })
}

//获取项目的用户列表
getUserByRoleCode:function getUserByRoleCode(roleCode,callback){
    loginAdmin.login(function (err, r) {
        if(err){
            callback(err);
        }else{
            _get("/admin/role/"+ roleCode+"/user", function(error, result) {
                if(error){
                    callback(error);
                }else{
                    callback(null, result);
                }
            },r.jSessionId);
        }
    })
}


getRolesBySubject:function getRolesBySubject(projectId,callback) {
    loginAdmin.login(function (err, r) {
        if(err){
            callback(err);
        }else{
            _get("/admin/app/"+CONSTANT.chorusAppId+"/role", function(error, result) {
                if(error){
                    callback(error);
                }else{
                    //console.log('cass 角色列表:',result);
                    var curProjectRoleArr =[];
                    for (var r =0;r<result.length;r++){
                        //console.log("caas 角色项目ID:"+result[r].subjectCode+"   角色code:"+result[r].code);
                        if(result[r].subjectCode == projectId){
                            curProjectRoleArr.push(result[r]);
                        }
                    }
                    callback(null, curProjectRoleArr);
                }
            },r.jSessionId);
        }
    })
}


//添加用户并赋予角色
addUserAddRole:function addUserAddRole(userCode,roleCode,userName,email,callback) {
    console.log('添加用户并赋予角色接口参数：{0},{1},{2}',userCode,roleCode,userName);
    loginAdmin.login(function (err, r) {
        if(err){
            callback(err);
        }else{
            _post("/admin/app/"+ CONSTANT.chorusAppId +"/ipa/users",[{"name":userName,"removed":false,"email":email,"isActive":1}]
            ,function(error, result) {
                if(error){
                    console.log("1.3  从IPA 查找人员并添加成应用用户（/admin/app/{appCode}/ipa/users）接口返回结果(error) begin：");
                    console.log(error);
                    console.log("1.3  从IPA 查找人员并添加成应用用户（/admin/app/{appCode}/ipa/users）接口返回结果(error) end")
                    callback(error);
                }else{
                    console.log("添加用户结果：",result);
                    //赋角色权限
                    _post("/admin/user/"+ userCode +"/role/"+roleCode,{},function(error2, result) {
                        console.log("_addRoleToUser::",error2,result);
                        if(error2){
                            callback(error2);
                        }else{
                            callback(null, result);
                        }
                    },r.jSessionId);

                }
            },r.jSessionId);
        }
    })
}

roleToUser:function roleToUser(userCode,roleCode,callback) {
    loginAdmin.login(function (err, r) {
        if (err) {
            callback(err);
        } else {
            //赋角色权限
            _post("/admin/user/"+ userCode +"/role/"+roleCode,{},function(error2, result) {
                console.log("roleToUser::",error2,result);
                if(error2){
                    callback(error2);
                }else{
                    callback(null, result);
                }
            },r.jSessionId);
        }
    });
}

//修改角色
updateRoleOfUser:function updateRoleOfUser(userCode,roleCodeOld,roleCodeNew,callback) {
    loginAdmin.login(function (err, r) {
        if (err) {
            callback(err);
        } else {
            _delete("/admin/user/"+ userCode +"/role/"+roleCodeOld,{},function(error, result) {
                if(error){
                    callback(error);
                }else{
                    _post("/admin/user/"+ userCode +"/role/"+roleCodeNew,{},function(error2, result) {
                        if(error2){
                            callback(error2);
                        }else{
                            callback(null, result);
                        }
                    },r.jSessionId);
                }
            },r.jSessionId);


        }
    });

}

function _addRoleToUser(userCode, roleCode,jSessionId,callback) {
    _post("/admin/user/"+ userCode +"/role/"+roleCode,{},function(error2, result) {
        console.log("_addRoleToUser::",error2,result);
        if(error2){
            callback(error2);
        }else{
            callback(null, result);
        }
    },jSessionId);
}

//删除用户（角色）
deleteUserFromCaas:function deleteUserFromCaas(userCode, roleCode, callback) {
    loginAdmin.login(function (err, r) {
        if(err){
            callback(err);
        }else{
            _delete("/admin/user/"+ userCode +"/role/"+roleCode,{},function(error, result) {

                console.log(error,result);
                if(error){
                    callback(error);
                }else{
                    callback(null, result);
                }
            },r.jSessionId);
        }
    })

}


userIsInProject:function userIsInProject(projectId, userCode, callback) {
    loginAdmin.login(function (err, r) {
        if(err){
            callback(err);
        }else{
            _get("/admin/user/"+ userCode +"/subject/"+projectId +"/role",function(error, result) {
                console.log(error,result);
                if(error){
                    callback(error);
                }else{
                    callback(null, result);
                }
            },r.jSessionId);
        }
    })
}

getUserInfoByName:function getUserInfoByName(searchCondition,callback) {
    loginAdmin.login(function (err, r) {
        if(err){
            callback(err);
        }else{
            _post("/admin/app/"+CONSTANT.chorusAppId+"/user",searchCondition,function(error, result) {
                console.log(error,result);
                if(error){
                    callback(error);
                }else{
                    callback(null, result);
                }
            },r.jSessionId);
        }
    })
}


module.exports = {
    getAppUser:getAppUser,
    getUserList :getUserList,
    getRolesBySubject:getRolesBySubject,
    updateRoleOfUser:updateRoleOfUser,
    addUserAddRole: addUserAddRole,
    deleteUserFromCaas:deleteUserFromCaas,
    getUserByRoleCode:getUserByRoleCode,
    roleToUser:roleToUser,
    userIsInProject:userIsInProject,
    getUserInfoByName:getUserInfoByName
}