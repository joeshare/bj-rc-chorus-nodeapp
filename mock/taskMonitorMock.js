/**
 * Created by AnThen on 2017-4-18.
 */

function getList(){
    return {
        "code": "0",
        "msg": "成功",
        "data": {
            "pageNum": 1,
            "pageSize": 10,
            "size": 0,
            "orderBy": "",
            "startRow": 0,
            "endRow": 0,
            "total": 23,
            "pages": 0,
            "list": [
                {
                    "jobId": 193,
                    "jobExecutionId": 2381,
                    "jobInstanceId": 2373,
                    "jobName": "chorus_01b744cc-c1ba-4538-8999-623e77db00e0",
                    "jobAliasName": "rdb-job-hive",
                    "jobDescription": "",
                    "jobExecuteStatus": "COMPLETED",
                    "jobStatus": "DEPLOY",
                    "jobStartTime": "2017-02-08 15:16:26",
                    "jobStopTime": "2017-02-08 15:18:06"
                },
                {
                    "jobId": 195,
                    "jobExecutionId": 2378,
                    "jobInstanceId": 2370,
                    "jobName": "chorus_a3941f92-d4d2-47a9-8e2e-9b8d22689850",
                    "jobAliasName": "rdb-fail",
                    "jobDescription": "",
                    "jobExecuteStatus": "FAILED",
                    "jobStatus": "UNDEPLOY",
                    "jobStartTime": "2017-02-08 14:29:28",
                    "jobStopTime": "2017-02-08 14:31:10"
                },
                {
                    "jobId": 193,
                    "jobExecutionId": 2363,
                    "jobInstanceId": 2355,
                    "jobName": "chorus_01b744cc-c1ba-4538-8999-623e77db00e0",
                    "jobAliasName": "rdb-job-hive",
                    "jobDescription": "",
                    "jobExecuteStatus": "COMPLETED",
                    "jobStatus": "DEPLOY",
                    "jobStartTime": "2017-02-07 14:09:00",
                    "jobStopTime": "2017-02-07 14:09:58"
                },
                {
                    "jobId": 196,
                    "jobExecutionId": 2345,
                    "jobInstanceId": 2337,
                    "jobName": "chorus_644587dc-1ece-4c09-8f16-ff1f5f70078a",
                    "jobAliasName": "rdb-composite",
                    "jobDescription": "",
                    "jobExecuteStatus": "COMPLETED",
                    "jobStatus": "UNDEPLOY",
                    "jobStartTime": "2017-01-12 10:29:29",
                    "jobStopTime": "2017-01-12 10:30:56"
                },
                {
                    "jobId": 193,
                    "jobExecutionId": 2344,
                    "jobInstanceId": 2336,
                    "jobName": "chorus_01b744cc-c1ba-4538-8999-623e77db00e0",
                    "jobAliasName": "rdb-job-hive",
                    "jobDescription": "",
                    "jobExecuteStatus": "COMPLETED",
                    "jobStatus": "DEPLOY",
                    "jobStartTime": "2017-01-12 10:27:56",
                    "jobStopTime": "2017-01-12 10:28:36"
                },
                {
                    "jobId": 196,
                    "jobExecutionId": 2268,
                    "jobInstanceId": 2260,
                    "jobName": "chorus_644587dc-1ece-4c09-8f16-ff1f5f70078a",
                    "jobAliasName": "rdb-composite",
                    "jobDescription": "",
                    "jobExecuteStatus": "COMPLETED",
                    "jobStatus": "UNDEPLOY",
                    "jobStartTime": "2017-01-09 16:12:17",
                    "jobStopTime": "2017-01-09 16:14:09"
                },
                {
                    "jobId": 193,
                    "jobExecutionId": 2239,
                    "jobInstanceId": 2231,
                    "jobName": "chorus_01b744cc-c1ba-4538-8999-623e77db00e0",
                    "jobAliasName": "rdb-job-hive",
                    "jobDescription": "",
                    "jobExecuteStatus": "COMPLETED",
                    "jobStatus": "DEPLOY",
                    "jobStartTime": "2017-01-06 16:41:46",
                    "jobStopTime": "2017-01-06 16:42:26"
                },
                {
                    "jobId": 196,
                    "jobExecutionId": 2236,
                    "jobInstanceId": 2228,
                    "jobName": "chorus_644587dc-1ece-4c09-8f16-ff1f5f70078a",
                    "jobAliasName": "rdb-composite",
                    "jobDescription": "",
                    "jobExecuteStatus": "COMPLETED",
                    "jobStatus": "UNDEPLOY",
                    "jobStartTime": "2017-01-06 16:38:24",
                    "jobStopTime": "2017-01-06 16:39:54"
                },
                {
                    "jobId": 195,
                    "jobExecutionId": 2234,
                    "jobInstanceId": 2226,
                    "jobName": "chorus_a3941f92-d4d2-47a9-8e2e-9b8d22689850",
                    "jobAliasName": "rdb-fail",
                    "jobDescription": "",
                    "jobExecuteStatus": "FAILED",
                    "jobStatus": "UNDEPLOY",
                    "jobStartTime": "2017-01-06 13:33:04",
                    "jobStopTime": "2017-01-06 13:41:19"
                },
                {
                    "jobId": 195,
                    "jobExecutionId": 2125,
                    "jobInstanceId": 2117,
                    "jobName": "chorus_a3941f92-d4d2-47a9-8e2e-9b8d22689850",
                    "jobAliasName": "rdb-fail",
                    "jobDescription": "",
                    "jobExecuteStatus": "FAILED",
                    "jobStatus": "UNDEPLOY",
                    "jobStartTime": "2017-01-05 11:51:54",
                    "jobStopTime": "2017-01-05 11:52:40"
                }
            ],
            "firstPage": 0,
            "prePage": 0,
            "nextPage": 0,
            "lastPage": 0,
            "isFirstPage": false,
            "isLastPage": false,
            "hasPreviousPage": false,
            "hasNextPage": false,
            "navigatePages": 0,
            "navigatepageNums": ""
        }
    };
}
var getXdModules={
    "code": 0,
    "msg": "success",
    "data": [{
        //moduleType: 1 moduleName:

        "moduleId": "xxxxxx", // 模块ID
        "moduleType": "1", // 模块类型(模块类型 1:默认Job 2:用户自定义Job 3:默认Stream source 4:用户自定义Stream source 5:默认Stream processor 6:用自定义Stream processor 7:默认Stream sink 8:用户自定义Stream sink 9:默认Stream other 10:用户自定义Stream other 11:job definition)
        "moduleName": "chorus-universal-module", // Spring XD 定义Module名称
        "xdModuleTypeName": "xxxxxx", // 任务名称
        "moduleAliasName": "xxxxxx" // Spring XD 定义Module画面显示别名
    },{
        "moduleId": "xxxxxx", // 模块ID
        "moduleType": "2", // 模块类型(模块类型 1:默认Job 2:用户自定义Job 3:默认Stream source 4:用户自定义Stream source 5:默认Stream processor 6:用自定义Stream processor 7:默认Stream sink 8:用户自定义Stream sink 9:默认Stream other 10:用户自定义Stream other 11:job definition)
        "moduleName": "Batch2", // Spring XD 定义Module名称
        "xdModuleTypeName": "xxxxxx", // 任务名称
        "moduleAliasName": "xxxxxx" // Spring XD 定义Module画面显示别名
    },{
        "moduleId": "xxxxxx", // 模块ID
        "moduleType": "3", // 模块类型(模块类型 1:默认Job 2:用户自定义Job 3:默认Stream source 4:用户自定义Stream source 5:默认Stream processor 6:用自定义Stream processor 7:默认Stream sink 8:用户自定义Stream sink 9:默认Stream other 10:用户自定义Stream other 11:job definition)
        "moduleName": "source3", // Spring XD 定义Module名称
        "xdModuleTypeName": "xxxxxx", // 任务名称
        "moduleAliasName": "xxxxxx" // Spring XD 定义Module画面显示别名
    }, {
        "moduleId": "xxxxxx", // 模块ID
        "moduleType": "4", // 模块类型(模块类型 1:默认Job 2:用户自定义Job 3:默认Stream source 4:用户自定义Stream source 5:默认Stream processor 6:用自定义Stream processor 7:默认Stream sink 8:用户自定义Stream sink 9:默认Stream other 10:用户自定义Stream other 11:job definition)
        "moduleName": "source", // Spring XD 定义Module名称
        "xdModuleTypeName": "xxxxxx", // 任务名称
        "moduleAliasName": "xxxxxx" // Spring XD 定义Module画面显示别名
    }, {
        "moduleId": "xxxxxx", // 模块ID
        "moduleType": "5", // 模块类型(模块类型 1:默认Job 2:用户自定义Job 3:默认Stream source 4:用户自定义Stream source 5:默认Stream processor 6:用自定义Stream processor 7:默认Stream sink 8:用户自定义Stream sink 9:默认Stream other 10:用户自定义Stream other 11:job definition)
        "moduleName": "processor5", // Spring XD 定义Module名称
        "xdModuleTypeName": "xxxxxx", // 任务名称
        "moduleAliasName": "xxxxxx" // Spring XD 定义Module画面显示别名
    }, {
        "moduleId": "xxxxxx", // 模块ID
        "moduleType": "6", // 模块类型(模块类型 1:默认Job 2:用户自定义Job 3:默认Stream source 4:用户自定义Stream source 5:默认Stream processor 6:用自定义Stream processor 7:默认Stream sink 8:用户自定义Stream sink 9:默认Stream other 10:用户自定义Stream other 11:job definition)
        "moduleName": "processor6", // Spring XD 定义Module名称
        "xdModuleTypeName": "xxxxxx", // 任务名称
        "moduleAliasName": "xxxxxx" // Spring XD 定义Module画面显示别名
    }, {
        "moduleId": "xxxxxx", // 模块ID
        "moduleType": "7", // 模块类型(模块类型 1:默认Job 2:用户自定义Job 3:默认Stream source 4:用户自定义Stream source 5:默认Stream processor 6:用自定义Stream processor 7:默认Stream sink 8:用户自定义Stream sink 9:默认Stream other 10:用户自定义Stream other 11:job definition)
        "moduleName": "sink7", // Spring XD 定义Module名称
        "xdModuleTypeName": "xxxxxx", // 任务名称
        "moduleAliasName": "xxxxxx" // Spring XD 定义Module画面显示别名
    }, {
        "moduleId": "xxxxxx", // 模块ID
        "moduleType": "8", // 模块类型(模块类型 1:默认Job 2:用户自定义Job 3:默认Stream source 4:用户自定义Stream source 5:默认Stream processor 6:用自定义Stream processor 7:默认Stream sink 8:用户自定义Stream sink 9:默认Stream other 10:用户自定义Stream other 11:job definition)
        "moduleName": "sink8", // Spring XD 定义Module名称
        "xdModuleTypeName": "xxxxxx", // 任务名称
        "moduleAliasName": "xxxxxx" // Spring XD 定义Module画面显示别名
    }]
}
module.exports ={
    getList

};