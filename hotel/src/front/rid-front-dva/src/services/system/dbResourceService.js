import { post, get, put, dele } from '../../utils/request';
import { URL, PAGE_SIZE } from '../../constants';

export function getDbResource({ page, type, server, resourceName, resourcePort }) {
    return get(`api/resource/getDbResource`,
        {
            pageIndex: page,
            pageSize: PAGE_SIZE,
            type: type,
            serverIP: server,
            resourceName: resourceName,
            resourcePort: resourcePort
        });
}
// 删除
export function del({ id }) {
    return dele(`api/resource/deleteDbResource/` + id,
    );
}

export function dbEdit({ dbID }) {
    return get('api/resource/getEditDbResource/' + dbID);
}

export function queryDbResource({ page, type, serverIP, resourceName, resourcePort }) {
    return get(`api/resource/queryDbResource/` + type,
        {
            pageIndex: page,
            pageSize: PAGE_SIZE,
            type: type,
            serverIP: serverIP,
            resourceName,
            resourcePort
        });
}
export function queryRedisResource({ page, redisIP, redisPort, redisName }) {
    return get(`api/resource/queryRedisResource`,
        {
            redisIP: redisIP,
            redisPort: redisPort,
            redisName: redisName,
            pageIndex: page,
            pageSize: PAGE_SIZE,
        });
}
export function edit({ id, dbName, ip, port, dbVersion,slaves,examine }) {
    return put('api/resource/editMasterDbResource/' + id, {
        id,
        name: dbName,
        ip,
        port,
        dbVersion,
        slaves,
        examine
    });
}

// 删除
export function delRedis({ id }) {
    return dele(`api/resource/deleteMasterRedisResource/`+id);
}

export function editSlaveDbResource({ id, ip, port, dbVersion }) {
    return put(`api/resource/editSlaveDbResource/` + id,
        {
            ip,
            port,
            dbVersion
        });
}

export function addSlaveDbResource({ master, ip, port, dbVersion }) {
    return post(`api/resource/addSlaveDbResource` ,
        {
            master,
            ip,
            port,
            dbVersion
        });
}

export function deleteSlaveDbResource({id}) {
    return dele(`api/resource/deleteSlaveDbResource/`+id);
}

export function addExamineDbResource({master, ip, port, dbVersion}) {
    return post(`api/resource/addExamineDbResource`,{
        master,
        ip,
        port,
        dbVersion
    });
}
export function editExamineDbResource({id,ip, port, dbVersion}) {
    return put(`api/resource/editExamineDbResource/`+id, {
        ip,
        port,
        dbVersion
    });
}
export function deleteExamineDbResource({id}) {
    return dele(`api/resource/deleteExamineDbResource/`+id);
}