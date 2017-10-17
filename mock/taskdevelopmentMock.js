/**
 * Created by AnThen on 2017-4-18.
 */

function getInstance(){
    return {
        "code": "0",
        "msg": "成功",
        "data": [
            {
                "instanceId": 130,
                "projectId": 222312,
                "resourceInnerId": 49,
                "instanceSize": 1,
                "groupName": "test12_1",
                "createTime": 1486353476000,
                "updateTime": 1486353476000,
                "instanceDesc": "aa",
                "commonStatus": {
                    "statusId": "",
                    "statusCode": "2102",
                    "statusName": "已启动",
                    "statusType": "20"
                },
                "resourceTemplate": {
                    "resourceTemplateId": 5,
                    "resourceName": "container-locality-template",
                    "resourceCpu": 1,
                    "resourceMemory": 2,
                    "resourceStorage": 1,
                    "createTime": "",
                    "updateTime": "",
                    "statusCode": ""
                },
                "environmentInfoList": [
                    {
                        "environmentId": 1,
                        "environmentName": "java",
                        "environmentVersion": "1.8",
                        "createTime": "",
                        "updateTime": "",
                        "statusCode": ""
                    }
                ],
                "resourceCpu": "",
                "resourceMemory": ""
            }
        ]
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
    getInstance:getInstance,
    getXdModules

};