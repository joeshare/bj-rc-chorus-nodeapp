var exports = module.exports = {};

module.exports = function(host, port, urlPrefix, appKey, appSecret, proxy, sslEnable) {
	var querystring = require("querystring");
	var sign = require("./sign.js");

	var enableSSL;
	var http = require("http");
	if(typeof arguments[arguments.length - 1] === "boolean" 
		&& arguments[arguments.length - 1]) {
		enableSSL = true;
		http = require("https");
	}

	var options = {
        host : host,
        port : port,
        headers: {}
    };

    if(typeof arguments[arguments.length - 1] === "object"
    	|| typeof arguments[arguments.length - 2] === "object") {
    	var HttpProxyAgent = (enableSSL ? require("https-proxy-agent") : require("http-proxy-agent"));
    	options.agent = new HttpProxyAgent(proxy.host + ":" + proxy.port);
    }

    function _get(path, callback, xAuthToken) {
    	_request(path, "GET", null, xAuthToken, callback);
    }

	function _post(path, data, callback, xAuthToken) {
		_request(path, "POST", data, xAuthToken, callback);
	}

	function _request(path, method, data, xAuthToken, callback) {
		options.path = urlPrefix + path;
		options.method = method;
		if(xAuthToken) {
			options.headers["x-auth-token"] = xAuthToken;
		}
		if(method === "POST") {
			options.headers["Content-Type"] = "application/x-www-form-urlencoded"
		}
	    var buffer;
	    var req = http.request(options, function(res) {
	        res.on("data", function(chunk) {
	            if(!buffer) {
	                buffer = new Buffer(chunk);
	            } else {
	                buffer = Buffer.concat([buffer, chunk]);
	            }
	        });
	        res.on("end", function() {
	            var response = buffer.toString();
	            try {
	            	var result;
	            	try {
	            		result = JSON.parse(response);
	            	} catch(err) {
	            		result = {
	           				result : response
	            		};
	            	}
	            	if(res.headers["x-auth-token"]) {
	            		result.xAuthToken = res.headers["x-auth-token"];
	            	}
	                callback(null, result);
	            } catch(e) {
	                callback(e, null);
	            }
	        });
	    });
	    req.on("error", function(e) {
	        console.log(e);
	        callback(e, null);
	    });
	    if(data) {
	    	req.write(data);
	    }
	    req.end();
	}

	/* ------------------------------------------------------------- */
	/* ---            stateable agent method                     --- */
	/* ---                      START                            --- */
	function _login(loginName, password, vcode, xAuthToken, callback) {
		_post("/user/login", querystring.stringify({
			login_name : loginName,
			password : password,
			vcode : vcode
		}), function(error, result) {
			callback(error, result);
		}, xAuthToken);
	}

	function _signup(userName, password, email, mobile, vcode, xAuthToken, callback) {
		_post("/user/register", querystring.stringify({
			user_name : userName,
			password : password,
			email : email,
			mobile : mobile,
			vcode : vcode,
			app_key : appKey
		}), function(error, result) {
			callback(error, result);
		});
	}

	function _changePassword(accessToken, oldPassword, password, vcode, xAuthToken, callback) {
		_getAuthCode(accessToken, function(error, result) {
			_post("/user/changepwd", querystring.stringify({
				auth_code : result.auth_code,
				old_password : oldPassword,
				password : password,
				vcode : vcode
			}), function(error, result) {
				callback(error, result);
			}, xAuthToken);
		});
	}

	function _base64Vcode(xAuthToken, callback) {
		_get("/common/base64vimg", function(error, result) {
			callback(error, result);
		}, xAuthToken);
	}

	function _validateUserName(name, xAuthToken, callback) {
		_get("/validation/user/name/" + name, function(error, result) {
			callback(error, result);
		}, xAuthToken);
	}

	function _validateEmail(email, xAuthToken, callback) {
		_get("/validation/user/email/" + email, function(error, result) {
			callback(error, result);
		}, xAuthToken);
	}

	function _validateMobile(mobile, xAuthToken, callback) {
		_get("/validation/user/mobile/" + mobile, function(error, result) {
			callback(error, result);
		}, xAuthToken);
	}

	function _validateVcode(vcode, xAuthToken, callback) {
		_get("/validation/vcode/" + vcode, function(error, result) {
			callback(error, result);
		}, xAuthToken);
	}

	/* ---                      END                             --- */
	/* ------------------------------------------------------------ */

	function _auth(authCode, callback) {
		var data = _buildBody("auth", {
			auth_code : authCode
		});
		_post("/user/auth", data, function(error, result) {
			callback(error, result);
		});
	}

	function _getAuthCode(accessToken, callback) {
		var data = _buildBody("access", {
			access_token : accessToken
		});
		_post("/user/authcode", data, function(error, result) {
			callback(error, result);
		});
	}

	function _getUserInfo(accessToken, callback) {
		var data = _buildBody("access", {
			access_token : accessToken
		});
		_post("/user/info", data, function(error, result) {
			callback(error, result);
		});
	}

	function _checkAuth(accessToken, resourceCode, operation, callback) {
		var data = _buildBody("checkAuth", {
			access_token : accessToken,
			resource_code : resourceCode,
			operation : operation
		});
		_post("/user/check", data, function(error, result) {
			callback(error, result);
		});
	}

	function _batchCheckAuth(accessToken, resourceCodes, operation, callback) {
		var data = _buildBody("batchCheckAuth", {
			access_token : accessToken,
			resource_codes : resourceCodes,
			operation : operation
		});
		_post("/user/batchcheck", data, function(error, result) {
			callback(error, result);
		});
	}

	function _refreshToken(refreshToken, callback) {
		var data = _buildBody("refresh", {
			refresh_token : refreshToken
		});
		_post("/user/refresh", data, function(error, result) {
			callback(error, result);
		});
	}

	function _resetPassword(loginName, password, callback) {
		var data = _buildBody("resetPassword", {
			login_name : loginName,
			password : password
		});
		_post("/user/resetpwd", data, function(error, result) {
			callback(error, result);
		});
	}

	function _logout(accessToken, callback) {
		var data = _buildBody("access", {
			access_token : accessToken
		});
		_post("/user/logout", data, function(error, result) {
			callback(error, result);
		});
	}

	function _getRolesBySubject(accessToken, subjectCode, callback) {
		var data = {
			access_token : accessToken,
			app_key : appKey,
			timestamp : new Date().getTime()
		};
		_post("/user/subject/" + subjectCode + "/role", querystring.stringify(data), function(error, result) {
			callback(error, result);
		});
	}

	function _buildBody(type, paramObj) {
		var timestamp = new Date().getTime();
		var params = [appKey];
		for(var key in paramObj) {
			params.push(paramObj[key]);
		}
		params.push(appSecret);
		params.push(timestamp);
		var signature = sign[type].apply(sign, params);

		paramObj.app_key = appKey;
		paramObj.timestamp = String(timestamp);
		paramObj.sign = signature;
		return querystring.stringify(paramObj);
	}

	return {
		buildBody : _buildBody,
		login : _login,
		signup : _signup,
		changePassword : _changePassword,
		base64Vcode : _base64Vcode,
		validateUserName : _validateUserName,
		validateMobile : _validateMobile,
		validateEmail : _validateEmail,
		validateVcode : _validateVcode,
		auth : _auth,
		getAuthCode : _getAuthCode,
		getUserInfo : _getUserInfo,
		checkAuth : _checkAuth,
		batchCheckAuth : _batchCheckAuth,
		getRolesBySubject : _getRolesBySubject,
		refreshToken : _refreshToken,
		resetPassword : _resetPassword,
		logout : _logout
	}
}