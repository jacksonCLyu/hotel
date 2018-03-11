const conf = {
    bizType: {
        "1": "创建数据库实例",
        "2": "启动实例",
        "3": "更新数据库密码",
        "4": "创建数据库",
    },
    operationType:{
        "1":"更新",
        "2":"添加",
        "3":"删除",
    },
    opertionStatus: {
        "0":"成功",
        "1":"失败",
    },
    opertionResourceType: {
        "1":"SQL",
        "2":"服务器",
        "3":"实例配置模版",
        "4":"数据库资源",
        "5":"人员",
        "6":"角色",
        "7":"任务流模板",
        "8":"SQL查询模版",
        "9":"任务流"
    },
    instanceType: {
        "1":"MySql",
        "2":"Redis",
    },
    sqlType:{
        "1":"DDL",
        "2":"DML"
    },
    implementState:{
        "1":"已提交",
        "2":"实验库执行失败",
        "3":"实验库执行成功",
        "4":"DBA审核SQL",
        "5":"主库执行失败",
        "6":"主库执行成功",
        "7":"实验库执行中",
        "8":"主库执行中",
    },
    taskFlowState:{
        "0":"未运行",
        "1":"运行中",
        "2":"运行成功",
        "3":"运行失败",
    },
};

export function dataDict(dict, id, def) {
        const cfg = conf[dict], key = id + '';
    return cfg.hasOwnProperty(key) ? cfg[key] : def;
}

export function dict(dictId) {
    return conf[dictId];
}
