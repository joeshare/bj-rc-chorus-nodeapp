/**
 * Created by AnThen on 2017-2-23.
 * 为项目管理服务提供支持
 */
'use strict'
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');

var subject = require('../modules/authIntegration/SubjectInterface');
var chorusProjectInterface = require('../interface/chorusProjectInterface.js');
var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/projectinfo',
    contentType:'application/json'
};
const OWNER_ROLE=3;
function classOf(obj){
    return Object.prototype.toString.call(obj).slice(8, -1);
}

/**
 *
 * @param tasks array  (Promise arr)
 * @returns {*}
 */
function tasksRunResultArr(tasks) {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);
    return tasks.reduce(function (promise, task) {
        return promise.then(task).then(pushValue);
    }, Promise.resolve());
}

function resourcer2PromiseArr(opt){
    let pArr=[];
    let appCode=opt.appCode;
    let sessId=opt.sessId;
    let createUserId=opt.createUserId;
    let reslist=opt.reslist;
    let rlist=opt.rlist;
    rlist.forEach(mclist=>{
        let resouce=mclist.resouce;
        let resouceName=mclist.name;
        if (reslist.indexOf(mclist.resouce) < 0) {
            let bindArg={
                appCode,
                resouce,
                sessId,
                resouceName,
                createUserId
            }
            pArr.push(((bindArg,res)=>{
               return new Promise((resolve, reject)=>{
                   //创建资源
                   subject.createResouce(bindArg.appCode, bindArg.resouce, bindArg.sessId, bindArg.resouceName,bindArg.createUserId, function (error, mq) {
                       if(!error) {
                           resolve({"code":0,"data":{
                               code: mq.code,
                               name:bindArg.resouceName,
                               creationUser: mq.creationUser,
                               creationTime: mq.creationTime,
                               version: 1,
                               removed: false,
                               appCode: bindArg.appCode,
                               appName: 'chorus-app',
                               identifier: mq.identifier
                           }})
                       } else {
                           reject({"code":400,"msg":"创建资源失败"})
                       }

                   });
               })
            }).bind(null,bindArg))

        }
    })
    return pArr;

}
//绑定资源
function bindResource(opt){
    let appCode=opt.appCode;
    let sessId=opt.sessId;
    let createUserId=opt.createUserId;
    let reslist=opt.reslist;
    let resresult=opt.resresult;
    let rlist=opt.mcfg.rlist;
    let roleResourceList=[];
   let resourcerPArr= resourcer2PromiseArr({
        appCode,
        sessId,
        createUserId,
        reslist,
        rlist
    })
    function setRoleResourceList(values){
        resresult.concat(values);
        rlist.forEach((mclist,i)=> {
            resresult.forEach((resta)=> {
                    if (resta.identifier == mclist.resouce) {
                        roleResourceList.push({
                            "appCode": appCode,
                            "code": resta.code,
                            "name": resta.name,
                            "operationCode":"24"
                        })
                    }
                }
            )
        })
    }
   return Promise.all(resourcerPArr).then(values => {
       setRoleResourceList(values)

       //console.log('roleResourceList',roleResourceList);
        return roleResourceList;
    }, reason => {
       console.log("bindResource 失败");
       return reason;
    });
}
//将角色与资源建立关系
function bindRoleResource(bindArg,res){
    //是否出错
    function isError(o){
        return classOf(o)=="Object";
    }

    return new Promise((resolve, reject)=>{
        if(isError(res)){//报错了
            resolve(res)
        }else{
            let mm=bindArg.mm;
            let appCode=bindArg.appCode;
            let sessId=bindArg.sessId;
            let userId=bindArg.userId;
            let subjectCode=bindArg.subjectCode;//主题code
            let mcfg=bindArg.mcfg;
            let roleResourceList=res;
            let req=bindArg.req;
            let response=bindArg.response;
            let next=bindArg.next;
            var putobj = {
                "code": subjectCode,
                "name": mm.name,
                "appCode": appCode,
                "subjectCode": mm.code,//角色code
                "resources": roleResourceList
            };
            //绑定角色与资源
            subject.rolebindResouce(mm.code, putobj, sessId, function (error, rolebind) {
                
                if(!error)
                {
                    if (mcfg.ID == OWNER_ROLE) {//给当前用户owner触角
                        subject.addusetorole(userId, mm.code,sessId, function(aerror, adduserto) {
                            
                            if(!aerror) {
                                chorusProjectInterface.createProject(req, response,next,{subjectCode},(perror, presponse, pbody)=>{
                                    var resbody = appUtil.body2Json(pbody);
                                    if (perror) {
                                        resolve({"code":400,"msg":"创建项目失败"});
                                    }else if(resbody.code!==0){
                                        reject({"code":resbody.code,"msg":"创建项目失败"});
                                    } else{
                                        resolve({"code":0,"msg":"创建项目成功",data:resbody.data});
                                    }
                                })
                            }
                            else {
                                reject({"code":400,"msg":"当前用户添加到角色失败"});
                            }
                        })
                    }else{
                        resolve({"code":0,"msg":"角色与资源关系建立成功"});
                    }
                }
                else {
                    reject({"code":400,"msg":"绑定资源失败"});
                }
            });
        }
    })
}
//创建角色 Promise 链式
function createRolePromiseChain(opt){
    let mm=opt.mm;
    let appCode=opt.appCode;
    let sessId=opt.sessId;
    let userId=opt.createUserId;
    let req=opt.req;
    let response=opt.response;
    let next=opt.next;
    let mcfg=opt.mcfg;
    let subjectCode=opt.subjectCode;
    return  bindResource(opt).then(bindRoleResource.bind(null,{mm,mcfg,appCode,sessId,userId,req,response,next,subjectCode}))
}
//串行，回数慢 （不使用）
function allRequest(requests, callback, results) {
    if (requests.length === 0) {
        return callback(null, results);
    }
    var req = requests.shift();
    req(function (error, value) {
        if (error) {
            callback(error, value);
        } else {
            results.push(value);
            allRequest(requests, callback, results);
        }
    });
}
function roleconfig2RequestArr(roleconfig,opt){
    let pArr=[];
    let appCode=opt.appCode;
    let subjectCode=opt.subjectCode;
    let sessId=opt.sessId;
    let projectName=opt.projectName;
    let createUserId=opt.createUserId;
    let resresult=opt.resresult;
    let reslist=opt.reslist;
    let req=opt.req;
    let response=opt.response;
    let next=opt.next;
    let taskFun=(bindArg,callBack)=>{
        let roleName=bindArg.projectName + '_' + bindArg.mcfg.name;
        subject.createRole(bindArg.appCode, bindArg.subjectCode, bindArg.sessId,roleName , bindArg.createUserId, function (error, mm) {
            if(!error){
                let mcfg=bindArg.mcfg;
                let arg={appCode,sessId,mm,mcfg,subjectCode,createUserId,resresult,reslist,req,response, next};
                createRolePromiseChain(arg).then(success=>{ console.log("createRolePromiseChain end ok",success);callBack(null,success)},error=>{ console.log("createRolePromiseChain end error",error);callBack(error)})
            }else{
                callBack({"code":400,"msg":"创建角色失败"})
            }
        })
    };
    roleconfig.defaultcfg.forEach((mcfg,i)=> {
        pArr.push(taskFun.bind(null,{appCode,subjectCode,sessId,projectName,createUserId,mcfg}))
    })
    return pArr;
}

module.exports = {
    roleconfig2RequestArr:roleconfig2RequestArr
}