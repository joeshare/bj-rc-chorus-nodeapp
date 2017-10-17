/**
 * Author LLJ
 * Date 2016-7-8 14:54
 */
const CONSTANT=require('../config/constant');
var logger = require("../utils/loggerHelper");
var Redis = require('ioredis');
var ioRedis;
function model(opt){
    function init(cfg){
        ioRedis= new Redis({
            port: CONSTANT.redisPort,// Redis port
            host: CONSTANT.redisHost,// Redis host
            family: 4,// 4 (IPv4) or 6 (IPv6)
            password: CONSTANT.redisPassword,
            db:CONSTANT.redisDB
        })
    }
    /**
     *
     * @param k
     * @param callback 回调
     */
    this.get=function(k,callback){
        console.log('get ioRedis',k)
        ioRedis.get(k, function (err, res) {
            console.log('ioRedis',err)
            callback&&callback(err, res);
        });
    };
    /**
     *
     * @param k
     * @param v
     * @param callback 回调
     */
    this.set=function(k,v,callback){
        ioRedis.set(k, v,  function (err, res) {
            callback&&callback(err, res);
        });
    };
    init(opt);
}
module.exports =new model();
