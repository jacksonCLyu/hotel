import { request, post, get,put,dele } from '../../utils/request';
import { URL, PAGE_SIZE } from '../../constants';

export function getUsersByPage({ page,name}) {
    return get(`api/system/getUsersByPage`, 
    {
        pageIndex: page,
        pageSize: PAGE_SIZE,
        name:name
    });
}
export function getLdapUsers() {
    return get(`api/system/getLdapUsers`);
}

// // 添加用户
// export function add({ id }) {
//     return get(`system/userAdd`, { id });
// }

// 删除
export function del({ id }) {
    return dele(`api/system/deleteUser/`+id);
}


export function userEditDB({ userId }) {
    return get(`api/system/userEdit`, { userId });
}


export function userEditRedis({ userId }) {
    return get(`api/system/getRedisResource`, { userId });
}

export function userSaves({ userId,resource,type }) {
    const str=resource.join(',')
    return put(`api/system/userSave/`+userId, { resource:str,type});
}

export function getGrantRelation({ userId }) {
    return get(`api/sqlExamine/getGrantRelation`, {userId});
}

// 删除
export function delGrantRelation({ id }) {
    return dele(`api/sqlExamine/deleteResourceGrantRelation/`+id, );
}

export function selectGrantResources({ userId }) {
    return get(`api/sqlExamine/selectGrantResources`, {userId});
}


export function addGrantResources({resourceId,grantUserId }) {
    return post(`api/sqlExamine/addResourceGrantRelation`, { resourceId,grantUserId });
}