/**
 * 用户代理，
 * @type {exports}
 */
var CONSTANT = require("../config/constant.js");
function setUserName(req,v){
	req.session[CONSTANT.session.userName]=v;
}

function getUserName(req){
	return req.session[CONSTANT.session.userName]
}
function setUserInfo(req,info){
	req.session[CONSTANT.session.caasUserInfo]=info;
}

function getUserInfo(req){
	return req.session[CONSTANT.session.caasUserInfo]
}

function setIpaUserInfo(req,info){
	req.session[CONSTANT.session.ipaUserInfo]=info;
}
function getIpaUserInfo(req){
  return req.session[CONSTANT.session.ipaUserInfo]
}
function setUserResource(req,resources){
	req.session[CONSTANT.session.resourceCode]=resources;
}
function getUserResource(req){
	return 	req.session[CONSTANT.session.resourceCode];
}
/**
 * 资源检查
 * @param req
 * @param resource
 * @returns {boolean} true 有资源 false 无资源
 */
function checkUserResource(req,resource){
	var res=req.session[CONSTANT.session.resourceCode];
	if(res&&res.length&&res.indexOf(resource)>-1){
		return true;
	}else{
		return false;
	}
}

function setXAuthToken(req,xAuthToken){
	req.session[CONSTANT.session.xAuthToken]=xAuthToken;
}
function getXAuthToken(req){
   return req.session[CONSTANT.session.xAuthToken];
}
function deleteUserId(req){
	delete req.session[CONSTANT.session.userId];
}
function setUserId(req,id){
	req.session[CONSTANT.session.userId]=id;
}
function getUserId(req){
	return req.session?req.session[CONSTANT.session.userId]:null;
}
function setAccessInfo(req,info){
	req.session[CONSTANT.session.accessInfo]= {
		accessToken : info.access_token,
		expiresIn : info.expires_in,
		refreshToken : info.refresh_token
	};
}
function getAccessInfo(req){
  return req.session[CONSTANT.session.accessInfo];
}
/**
 * 设置当前主题code
 * @param req
 * @param code
 */
function setCurrentThemeCode(req,code){
	req.session[CONSTANT.session.currentThemeCode]= code;
}
/**
 * 获取当前主题code
 * @param req
 * @returns {*}
 */
/**
 * { projectMemberId: '',
  projectId: '222247',
  projectCode: 'wd_test',
  projectName: 'wd_test',
  projectDesc: '',
  projectManagerId: '0',
  managerTelephone: '15898118006',
  createUserId: '0',
  userId: '0',
  roleId: '',
  roleCode: '',
  roleName: '',
  userName: 'admin' }
 * @param req
 * @returns {*}
 */
function getCurrentThemeCode(req){
	return req.session[CONSTANT.session.currentThemeCode];
}
/**
 * 设置当前项目信息
 * @param req
 * @param info
 */
function setCurrentProjectInfo(req,info){
	req.session[CONSTANT.session.currentProjectInfo]=info;
}
/**
 * 获取当前项目信息
 * @param req
 * @returns {*}
 */
function getCurrentProjectInfo(req){
	return req.session[CONSTANT.session.currentProjectInfo];
}
/**
 * 设置chorus这个主题角色
 * @param {*} req 
 * @param {*} data 
 */
function setChorusRoleCode(req,data){
	req.session[CONSTANT.session.chorusRoleCode]=data;
}
/**
 * 获取chorus这个主题角色
 * @param {*} req 
 * @return {*}
 */
function getChorusRoleCode(req){
	return req.session[CONSTANT.session.chorusRoleCode];
}
module.exports ={
	deleteUserId:deleteUserId,
	setUserName:setUserName,
	getUserName:getUserName,
	setUserInfo:setUserInfo,
	getUserInfo:getUserInfo,
	setIpaUserInfo:setIpaUserInfo,
	getIpaUserInfo:getIpaUserInfo,
	setUserResource:setUserResource,
	getUserResource:getUserResource,
	checkUserResource:checkUserResource,
	setXAuthToken:setXAuthToken,
	getXAuthToken:getXAuthToken,
	setUserId:setUserId,
	getUserId:getUserId,
	setAccessInfo:setAccessInfo,
	getAccessInfo:getAccessInfo,
	setCurrentProjectInfo:setCurrentProjectInfo,
	getCurrentProjectInfo:getCurrentProjectInfo,
	setCurrentThemeCode:setCurrentThemeCode,
	getCurrentThemeCode:getCurrentThemeCode,
	setChorusRoleCode:setChorusRoleCode,
	getChorusRoleCode:getChorusRoleCode

};