const conf = {
    roomFlg: {
        "1": "未预定",
        "2": "已预订",
    },
    roomStandard:{
        "1":"标间",
        "2":"大床房",
        "3":"情侣主题",
        "4":"豪华总统",
    },
    orderFlg:{
        "1":"待支付",
        "2":"已支付",
        "3":"已退订",
    },
    
};

export function dataDict(dict, id, def) {
        const cfg = conf[dict], key = id + '';
    return cfg.hasOwnProperty(key) ? cfg[key] : def;
}

export function dict(dictId) {
    return conf[dictId];
}
