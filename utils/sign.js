var crypto = require("crypto");
var exports = module.exports = {};

exports.auth = function(appKey, authCode, secret, timestamp) {
	var signString = secret + "app_key" + appKey + "auth_code" + authCode + "timestamp" + timestamp + secret;
	var signature = crypto.createHash("md5").update(signString).digest("hex").toUpperCase();
	return signature;
}

exports.checkAuth = function(appKey, accessToken, resourceCode, secret, timestamp) {
	var signString = secret + "access_token" + accessToken + "app_key" + appKey + "resource_code" + resourceCode + "timestamp" + timestamp + secret;
	var signature = crypto.createHash("md5").update(signString).digest("hex").toUpperCase();
	return signature;
}

exports.batchCheckAuth = function(appKey, accessToken, resourceCodes, secret, timestamp) {
	var rcs = resourceCodes.toString();
	rcs = "[" + rcs.replace(new RegExp(",", "gm"), ", ") + "]";
	var signString = secret + "access_token" + accessToken + "app_key" + appKey + "resource_codes" + rcs + "timestamp" + timestamp + secret;
	var signature = crypto.createHash("md5").update(signString).digest("hex").toUpperCase();
	return signature;
}

exports.access = function(appKey, accessToken, secret, timestamp) {
	var signString = secret + "access_token" + accessToken + "app_key" + appKey + "timestamp" + timestamp + secret;
	var signature = crypto.createHash("md5").update(signString).digest("hex").toUpperCase();
	return signature;
}

exports.refresh = function(appKey, refreshToken, secret, timestamp) {
	var signString = secret + "app_key" + appKey + "refresh_token" + refreshToken + "timestamp" + timestamp + secret;
	var signature = crypto.createHash("md5").update(signString).digest("hex").toUpperCase();
	return signature;
}

exports.resetPassword = function(appKey, loginName, password, secret, timestamp) {
	var signString = secret + "app_key" + appKey + "login_name" + loginName + "password" + password + "timestamp" + timestamp + secret;
	var signature = crypto.createHash("md5").update(signString).digest("hex").toUpperCase();
	return signature;
}