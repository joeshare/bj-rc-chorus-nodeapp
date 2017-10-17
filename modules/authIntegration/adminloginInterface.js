var exports = module.exports = {};
var CONSTANT = require("../../config/constant.js");
var http = require("http");
var md5utial = require('../../utils/appUtil')
var options = {
    host : CONSTANT.caas.host,
    port : CONSTANT.caas.port,
    headers: {}
};

exports.login = function(callback) {
    options.path ="/api/v1/admin/login";
    options.method = "POST";
    options.headers["Content-Type"] = "application/json";
    options.headers["Cookie"] = null;

    var varl = md5utial.md5(CONSTANT.cassAdmin.pwd).toLowerCase();
    console.log(CONSTANT.cassAdmin.pwd,varl)
    var data= JSON.stringify({"email":CONSTANT.cassAdmin.user,"password":varl});
    var result={};
    console.log(data)
    var req = http.request(options, function(res) {
        res.on("data", function(chunk) {
        });
        res.on("end", function() {
            if(res.headers["set-cookie"]) {
                result.jSessionId = res.headers["set-cookie"];
            }
            console.log("---------------------------------------------")
            console.log(result.jSessionId);
            callback(null, result);
        });
    });
    req.on("error", function(e) {
        callback(e, null);
    });
    if(data) {
        req.write(data);
    }
    req.end();
};

exports.rq = function (path, method, data, jSessionId, callback) {
    options.path = CONSTANT.caas.urlPrefix + path;
    options.method = method;
    if(jSessionId) {
        options.headers["Cookie"] = jSessionId;
    }
    options.headers["Content-Type"] = "application/json";
    //options.headers["Cookie"]= null;
    var buffer;

    //console.log('optionsoptions',options)
    var req = http.request(options, function(res) {
        if(res.statusCode == 200)
        {
            res.on("data", function(chunk) {
                if(!buffer) {
                    buffer = new Buffer(chunk);
                } else {
                    buffer = Buffer.concat([buffer, chunk]);
                }
            });

            res.on("end", function(endsult) {
                    var response = buffer.toString();
                   // try {
                        var result;
                        try {
                            result = JSON.parse(response);
                        } catch(err) {
                            result = {
                                result : response
                            };
                        }
                        callback(null, result);
                  //  } catch(e) {
                   //     callback(e, null);
                  //  }
            });
        }else if(res.statusCode > 200&&res.statusCode < 300){
            callback(null, {"code":0,"msg":"OK"});
        }
        else {
            callback({"code":res.statusCode,"msg":"HTTP ERROR"}, null);
        }
    });
    req.on("error", function(e) {
        callback(e, null);
    });
    if(data) {
        req.write(data);
    }
    req.end();
};
