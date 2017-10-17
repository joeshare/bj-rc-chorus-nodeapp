/**
 * Created by AnThen on 2016-8-31.
 */
var fs = require('fs');// 加载编码转换模块
var path = require("path");
var file = "/config/constant.js";

var data = fs.readFileSync(__dirname + file,'utf-8');
data = data + "";
data = data.replace(/appStatus:('|")?\w*('|")?,/g,function (word){
    return 'appStatus:"deploy",';//"development" "deploy",
});
data = data.replace(/sessionMode:('|")?\w*('|")?,/g,function (word){
    return 'sessionMode:"single",';//"development" cluster,

});
data = data.replace(/remoteHost:('|')?.+('|")?,/g,function (word){
    return 'remoteHost:"http://10.200.32.95",';//"development" cluster,
});
data = data.replace(/remotePort:('|")?.+('|")?,/g,function (word){
    return 'remotePort:"8080",';//"development" cluster,
});
data = data.replace(/remoteActionUrl:('|')?.+('|")?,/g,function (word){
    return 'remoteActionUrl:"http://10.200.32.95:8080",';//"development" cluster,
});
data = data.replace(/fenRemoteHost:('|')?.+('|")?,/g,function (word){
    return 'fenRemoteHost:"http://10.200.32.109",';//"development" cluster,
});
data = data.replace(/fenRemotePort:('|")?.+('|")?,/g,function (word){
    return 'fenRemotePort:"8080",';//"development" cluster,
});
data = data.replace(/appKey:('|")?.+('|")?,/g,function (word) {
    return 'appKey:"7ab6179e0283487884ddea129bbabfdb",';
});
data = data.replace(/appSecret:('|")?.+('|")?/g,function (word) {
    return 'appSecret:"f3d1f1ec4831465a891e49c3ec74b3af"';
});

data = data.replace(/appCode:\d+,/g,function (word) {
    return 'appCode:2,';
});

data = data.replace(/chorusAppId:\d+,/g,function (word) {
    return 'chorusAppId:2,';
});

data = data.replace(/chorusSubjectCode:\d+,/g,function (word) {
    return 'chorusSubjectCode:33,';
});

data = data.replace(/user:('|")?.+('|")?,/g,function (word) {
    return 'user:"ad@ad",';
});

data = data.replace(/pwd:('|")?.+('|")?/g,function (word) {
    return 'pwd:"1"';
});

data = data.replace(/redisHost:('|")?.+('|")?,/g,function (word) {
    return 'redisHost:"10.200.32.138",';
});
data = data.replace(/redisPort:\d+,/g,function (word) {
    return 'redisPort:7000,';

});
data = data.replace(/redisPrefix:('|")?.+('|")?,/g,function (word) {
    return 'redisPrefix:"chorusApp",';
});
data = data.replace(/host:('|")?.+dataengine.com('|")?/g,function (word) {
    return 'host:"caas.in.dataengine.com"';
});
data = data.replace(/identityKey:('|")?.+('|")?,/g,function (word) {
    return 'identityKey:"chorusApp",';
});
fs.writeFile(__dirname + file, data, function(err){
    if(err){
        console.log("error! " + file);
        console.log(err);
    }else{
        console.log("deploy.js success! ");
    }
});


