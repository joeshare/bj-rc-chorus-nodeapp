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
    return 'remoteHost:"http://10.200.48.106",';//"development" cluster,
});
data = data.replace(/remotePort:('|")?.+('|")?,/g,function (word){
    return 'remotePort:"8080",';//"development" cluster,
});
data = data.replace(/remoteActionUrl:('|')?.+('|")?,/g,function (word){
    return 'remoteActionUrl:"http://10.200.48.106:8080",';//"development" cluster,
});
data = data.replace(/fenRemoteHost:('|')?.+('|")?,/g,function (word){
    return 'fenRemoteHost:"http://10.200.48.106",';//"development" cluster,
});
data = data.replace(/fenRemotePort:('|")?.+('|")?,/g,function (word){
    return 'fenRemotePort:"8080",';//"development" cluster,
});
//caas
data = data.replace(/host:('|")?.+('|")?,/g,function (word) {
    return 'host:"caas-test.in.dataengine.com",';
});

data = data.replace(/appKey:('|")?.+('|")?,/g,function (word) {
    return 'appKey:"81fd5751b4384cd4b10891d69bb3c96b",';
});
data = data.replace(/appSecret:('|")?.+('|")?/g,function (word) {
    return 'appSecret:"6a4e24d535fc4fe1bcd0109acc20b087"';
});

data = data.replace(/appCode:\d+,/g,function (word) {
    return 'appCode:49,';
});

data = data.replace(/chorusAppId:\d+,/g,function (word) {
    return 'chorusAppId:49,';
});

data = data.replace(/chorusSubjectCode:\d+,/g,function (word) {
    return 'chorusSubjectCode:10440,';
});

data = data.replace(/user:('|")?.+('|")?,/g,function (word) {
    return 'user:"chorus-ad-test@caas.rongcapital.cn",';
});

data = data.replace(/pwd:('|")?.+('|")?/g,function (word) {
    return 'pwd:"1"';
});
data = data.replace(/chorusApp:('|")?.+('|")?,/g,function (word) {
    return 'appName:"chorusApp",';
});

data = data.replace(/redisHost:('|")?.+('|")?,/g,function (word) {
    return 'redisHost:"10.200.48.108",';
});
data = data.replace(/redisPort:\d+,/g,function (word) {
    return 'redisPort:6379,';
})
data = data.replace(/redisPrefix:('|")?.+('|")?,/g,function (word) {
    return 'redisPrefix:"chorusTestApp",';
});
data = data.replace(/host:('|")?.+dataengine.com('|")?/g,function (word) {
    return 'host:"caas-test.in.dataengine.com"';
});
data = data.replace(/identityKey:('|")?.+('|")?,/g,function (word) {
    return 'identityKey:"chorusTestApp",';
});
fs.writeFile(__dirname + file, data, function(err){
    if(err){
        console.log("error! " + file);
        console.log(err);
    }else{
        console.log("deploy_test.js success! ");
    }
});


