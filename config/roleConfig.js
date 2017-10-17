var guestArr = [
    {"name": "项目管理", "resouce": "projectmanagement-module"},
    {"name": "项目管理", "resouce": "/projectmanagement"},
    {"name": "DashBoard", "resouce": "/dashboard"},

    {"name": "数据管理", "resouce": "datamanagement-module"},
    {"name": "元数据查询", "resouce": "/metadatamanagement"},

    {"name": "数据分析", "resouce": "dataanalyse-module"},
    {"name": "即席查询", "resouce": "/impromptuquery"}
];

var datadevelop = [{"name": "数据开发", "resouce": "datadevelopment-module"},
    {"name": "任务开发", "resouce": "/taskdevelopment"},
    {"name": "任务监控", "resouce": "/taskmonitor"}];

/**
 * 角色配置信息
 */
module.exports = {
    defaultcfg: [{
        "ID": 3,
        "name": "项目Owner",
        "rlist": guestArr.concat([
            {"name": "成员管理", "resouce": "/membermanagement"},
            {"name": "资源配置", "resouce": "/resourceallocation"},
            {"name": "外部资源配置", "resouce": "/externalresource"},
            {"name": "数据表管理", "resouce": "/datatablemanagement"},
            {"name": "数据权限管理", "resouce": "/dataaccessmanagement"},
            {"name": "数据实验室", "resouce": "/datalaboratory"}
        ].concat(datadevelop) )
    }, {
        "ID": 4,
        "name": "项目管理员",
        "rlist": guestArr.concat([
            {"name": "成员管理", "resouce": "/membermanagement"},
            {"name": "资源配置", "resouce": "/resourceallocation"},
            {"name": "外部资源配置", "resouce": "/externalresource"},

            {"name": "数据表管理", "resouce": "/datatablemanagement"},
            {"name": "数据权限管理", "resouce": "/dataaccessmanagement"},

            {"name": "数据实验室", "resouce": "/datalaboratory"}

        ].concat(datadevelop))
    }, {
        "ID": 5,
        "name": "数据开发人员",
        "rlist": guestArr.concat([
            {"name": "外部资源配置", "resouce": "/externalresource"},

            {"name": "数据表管理", "resouce": "/datatablemanagement"},

            {"name": "数据实验室", "resouce": "/datalaboratory"},

        ].concat(datadevelop))
    }, {
        "ID": 6,
        "name": "数据分析人员",
        "rlist": guestArr.concat([
            {"name": "数据实验室", "resouce": "/datalaboratory"}
        ])
    }
    ],
    syscfg: [{
        "ID": 1,
        "name": "平台管理员",
        "rlist": [
            {"name": "平台管理", "resouce": "platformmanagement-module"},
            {"name": "Dashboard", "resouce": "/admindashboard"},
            {"name": "资源申请处理", "resouce": "/resourcesapplication"},
            {"name": "数据组件管理", "resouce": "/datacomponentmanagement"}
        ]
    }, {
        "ID": 2,
        "name": "平台访客",
        "rlist": guestArr
    }]
};
