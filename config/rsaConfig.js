/**
 * Created by AnThen on 2017-2-23.
 */
'use strict'
var session = require(('express-session'));

var fs = require('fs');
var path = require("path");
var rsaService =  require('node-rsa');

var dirpath =  path.join(__dirname,'../')+"public/";
var publickey = "/publick.key";
var privatekey = "/privatek.key";
var constants = require('./constant');

function init(app) {

    let key=new rsaService({b:512});
    let publicDer=key.exportKey('pkcs8-public');
    let privateDer=key.exportKey('pkcs8-private');

   // global.raspublickey = publicDer;
   // global.rsaprivatekey = privateDer;
    fs.writeFile(dirpath+publickey, publicDer, function(err){
        console.log(err?"初始化公钥文件失败!!":"初始化公钥文件成功!");
    });

    fs.writeFile(dirpath+privatekey, privateDer, function(err){
        console.log(err?"初始化私钥文件失败!!":"初始化私钥文件成功!");
    });
}

//获取公钥
function getpublickey() {
   // return global.raspublickey;
    return fs.readFileSync(dirpath+publickey,'utf-8');
}

//解码
function decrypt(enterstr) {
    let key=new rsaService({b:512});

   // let privateDer=global.rsaprivatekey;
    let privateDer=fs.readFileSync(dirpath+privatekey,'utf-8');

   // console.log('privateDer',privateDer);
    key.importKey(privateDer,'pkcs8-private');

    if(!key.isPrivate()){        //验证私钥是否正确
        console.log("导入RSA私钥失败!!");
        return null;
    }
    return key.decrypt(enterstr, 'utf-8');
}

module.exports = {
    init: init,
    getpublickey: getpublickey,
    decrypt:decrypt
}