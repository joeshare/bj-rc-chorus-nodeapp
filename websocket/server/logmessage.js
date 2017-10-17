/**
 * Created by Administrator on 2017-8-22.
 */

var httpClient = require('../../utils/httpClient');
var appUtil = require('../../utils/appUtil');
var CONSTANT = require('../../config/constant');
var defualtCfg = {
    url: CONSTANT.remoteHost + ":" + CONSTANT.remotePort ,
    method:'GET',
    contentType: 'application/json'
};

function logmessage(content,conn) {
    //var timestamp = Date.parse(new Date());
    var opt = Object.assign({}, defualtCfg)
    opt.method ='POST';
    opt.url += `/${content.userId}/${content.projectId}/job/${content.executionId}/log/tailf`;
    if(content.isfirstsend){
        opt.data={lastTimestamp:''};
    }
    else{
        opt.data={lastTimestamp:content.timestamp};
    }
    console.log('logmessage')
    opt.callBack = function (error, response, body) {
        let result =appUtil.body2Json(body).data;
        console.log(result)
       // console.log('result.lines.length',result)
        if(result&&result.lines&&result.lines.length>0){
            conn.send(JSON.stringify(result));
            /* result.lines.forEach((m)=>{
                if(m&&m.length){
                    conn.send(m);
                }
            })*/
        }
    }
    httpClient(opt);

}
module.exports={logmessage:logmessage};