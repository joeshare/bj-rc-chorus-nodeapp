/**
 * Author LLJ
 * Date 2016-7-8 14:54
 */
var crypto = require('crypto');
/**
 * 可以传入多个参数 返回 字符串
 * @returns {string}
 */
function getParamsStr(){
    var len=arguments.length,opt,arr=[];
    if(!len){
        return "";
    }
    for (var n= 0; n< len; n++){
        opt= arguments[n];
        if(!opt||typeof opt != 'object'){
           continue;
        }else{
            for(var k in opt){
                var v=encodeURI(opt[k]);
                arr.push(k+"="+v);
            }
        }

    }
    return arr.join("&");
}
/**
 *可以传入多个参数 返回 对象
 * @returns {{}}
 */
function getObj(){
    var len=arguments.length,opt,obj={};
    if(!len){
        return {};
    }
    for (var n= 0; n< len; n++){
        opt= arguments[n];
        if(!opt||typeof opt != 'object'){
            continue;
        }else{
            for(var k in opt){
                obj[k]=opt[k];
            }
        }

    }
    return obj;
}
function getPath(url){
    var u="";
    if(url){
        var index=url.indexOf("?");
        u=index>-1?url.substring(0,index):url;
    }
    return u;
}


module.exports ={
    getParamsStr:getParamsStr,
    getObj:getObj,
    getPath:getPath,
    extend:function(destination, source){
        for ( var property in source) {
            destination[property] = source[property];
        }
        return destination;
    },
    body2Json:function(body){
        var res=null;
        if(typeof body == 'string'){
            res=JSON.parse(body);
        }else{
            res=body;
        }
        if(res&&res.code){
            res.code*=1;
        }
        return res;
    },
    md5:function(content){
        var md5 = crypto.createHash('md5');
        md5.update(content);
        return   md5.digest("hex");

    },
    //随机数字符串
    randomStr:function(len){
        var x = "123456789poiuytrewqasdfghjklmnbvcxzQWERTYUIPLKJHGFDSAZXCVBNM";
        var str = "";
        for (var i = 0; i < len; i++) {
            str += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
        }
        return str;
    },
    type: function (obj) {
        return obj == null ? String(obj) : _class2type[_toString.call(obj)] || "object";
    },
    timestamp:function(){
        return new Date().getTime();
    }
};
