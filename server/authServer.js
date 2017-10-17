/**
 * Created by AnThen on 2017-2-23.
 */

var authInterface = require('../modules/authIntegration/AuthenticationInterface.js');
module.exports = {
    checkSession:authInterface.checkSession,
    checkAccess:authInterface.checkAccess,
    getUserInfo:authInterface.getUserInfo
}