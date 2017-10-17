/**
 * Created by Administrator on 2017-8-21.
 */
var ws = require("nodejs-websocket");
var logmessage  = require('../server/logmessage');
var othermessage  = require('../server/othermessage');
var rsaconfig = require('../../config/rsaConfig');
var handles = Object.assign(logmessage, othermessage);

var server = ws.createServer(function(conn){
    conn.on('text', function (httpcon){
        let httpobj = JSON.parse(httpcon)
        valication(httpobj.verifier,conn)&&handles[httpobj.handle](httpobj.content,conn);

    });
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });

}).listen(8005);
//验证用户
function valication(verifier,conn) {

    try{
        let verifiers = JSON.parse(verifier );//JSON.parse(rsaconfig.decrypt(verifier));

        //console.log('verifiers',verifiers);

        if(verifiers.userinfo.name){
            return true;
        }
        else{
            return false;
        }
    }catch(e) {
        conn.close();
        return false;
    }
}

server.on('connection', function (socket){
    var cookies = socket.headers.cookie;
});
console.log("websocket start")
module.exports = server;