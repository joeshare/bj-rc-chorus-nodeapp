var express = require('express');
var router = express.Router();
var rServer = require('../server/memeberManageServer');

// 1、获取角色列表(如：项目管理员、数据开发、数据查询)
router.post('/api/membermanagement/role/list',function(req,res,next){
    console.log('/api/membermanagement/role/list',req.body);
    rServer.getRolesBySubject(req,res,next);
})

// 3、添加成员
router.post('/api/membermanagement/add',function(req,res,next){
    console.log('/api/membermanagement/add',req.body);
    rServer.addUserAddRole(req,res,next);
});

// 5、删除成员
router.post('/api/membermanagement/del',function(req,res,next){
    console.log('/api/membermanagement/del',req.body);
    rServer.deleteUserFromCaas(req,res,next);
});

// 4、调整角色
router.post('/api/membermanagement/adjust',function(req,res,next){
    console.log('/api/membermanagement/adjust',req.body);
    rServer.updateRoleOfUser(req,res,next);
})

// 6、根据当前项目分页获取成员列表
router.post('/api/membermanagement/list',function(req,res,next){
    //console.log('/api/membermanagement/list',req.body);
    rServer.list(req,res,next);
})


// 判断成员是否已经在该项目里
router.post('/api/membermanagement/project/user',function(req,res,next){
    console.log('/api/membermanagement/project/user',req.body);

    rServer.userIsInProject(req,res,next);
});
//外部资源配置有引用，不要删除。
router.post('/api/membermanagement/getappuser',function (req, res, next) {
    rServer.getAppUser(req,res,next);
});
//
router.post('/api/membermanagement/getchorusroles',function (req, res, next) {
    console.log('/api/membermanagement/getchorusroles',req.body);

    rServer.getChorusRoles(req,res,next);
});

//getUserInfoByName
router.post('/api/membermanagement/getuserinfobyname',function (req, res, next) {
    console.log('/api/membermanagement/getuserinfobyname',req.body);

    rServer.getUserInfoByName(req,res,next);
});

module.exports = router;

