/**
 * Author LLJ
 * Date 2016-7-14 16:08
 */
'use strict'
var fs = require('fs');
var log4js = require('log4js');
// 加载配置文件
var objConfig = JSON.parse(fs.readFileSync("log4js.json", "utf8"));
log4js.configure(objConfig);
var logInfo = log4js.getLogger('logInfo');
var logErr = log4js.getLogger('logErr');
function transformString(arr){
    let sum = "";
    console.log("------------------------------------",arr,typeof arr =='string')
    arr.forEach(val=>{
        sum += val+" ";
    })

    return sum;
}
module.exports = {
    logInfo: function (...args) {
        logInfo.info(transformString(args));
    },
    logError: function (...args) {
        console.log('logError',args)
        logErr.error(transformString(args));
    },
    logDebug: function (...args) {
        console.debug(transformString(args));
    }
};

