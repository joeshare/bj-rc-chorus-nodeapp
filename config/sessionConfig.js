/**
 * Created by AnThen on 2017-2-23.
 */
var session = require(('express-session'));
var RedisStore = require('connect-redis')(session);
var ioRedis = require('ioredis');
var CONSTANT = require('./constant');

function register(app) {
    console.log("session register")
    var sessionMode = CONSTANT.sessionMode;
    //app.use(function(req, res, next){
    //    if(req.session){
    //        req.session._garbage =new Date();
    //        req.session.touch();
    //    }
    //    next();
    //});
    if (sessionMode === 'cluster') {
        var cluster = new ioRedis.Cluster(CONSTANT.clusterDbAddress);
        app.use(session({
            secret:CONSTANT.appName,
            name: CONSTANT.cookie.identityKey,
            cookie: {
                path:"/",
                domain:'.dataengine.com',
                maxAge: CONSTANT.cookie.maxAge
            },
            resave: false,
            saveUninitialized: true,
            store: new RedisStore({
                logErrors: true,
                prefix: CONSTANT.appName,
                unset: 'destroy',
                client: cluster
            })
        }));
    } else {
        app.use(session({
            secret: CONSTANT.appName,
            name: CONSTANT.cookie.identityKey,
            cookie: {
                path:"/",
                domain:'.dataengine.com',
                maxAge: CONSTANT.cookie.maxAge
            },
            resave: false,
            saveUninitialized: true,
            store: new RedisStore({
                db:CONSTANT.redisDB,
                host: CONSTANT.redisHost,
                port: CONSTANT.redisPort,
                pass: CONSTANT.redisPassword,
                logErrors: true,
                prefix: CONSTANT.redisPrefix
            })
        }));
    }
}
module.exports = register;