/**
 * 系统维护配置
 */
var CONSTANT = require('./constant');
var operationMiddleware = require('../utils/operationMiddleware');
function register(app) {
    console.log("operation register")
    var sessionMode = CONSTANT.sessionMode;
    //TODO：：
    if (sessionMode === 'cluster') {

    } else {
        app.use(operationMiddleware.checkout({
            operationStatusCode: CONSTANT.operationStatusCode,
        }));
    }
}
module.exports = register;