/**
 * Created by AnThen on 2017-2-23.
 */
function registor(req, res, next){
    console.log("allow origin register")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Allow-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("X-Powered-By", ' 3.2.1');
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();

}
module.exports = registor;