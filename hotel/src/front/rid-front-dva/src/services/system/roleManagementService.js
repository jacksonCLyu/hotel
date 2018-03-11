import { request, post, get,dele,put } from '../../utils/request';
import { URL, PAGE_SIZE } from '../../constants';

export function PageResult({ page }) {
    return get(`api/role/getRoles`,
        {
            pageIndex: page,
            pageSize: PAGE_SIZE,
        });
}
// 删除
export function del({ id }) {
    return dele(`api/role/deleteRole/`+id,);
}
// 添加
export function add({ name, des }) {
    return post(`api/role/addRole`, { name, des });
}

export function getRoleUsers({ roleId ,name,page}) {
    return get(`api/role/getRoleUsers`,
        {
            roleId,
            name,
            pageIndex: page,
            pageSize: PAGE_SIZE,
        });
}

export function selectUsers({ roleId }) {
    return get(`api/role/selectUsers`,
        {
            roleId
        });
}

export function addUserRole({ boId, roleId }) {
    return post(`api/role/addUserRole`, { boId, roleId });
}

// 删除
export function deleteUserRole({ boId, roleId }) {
    return dele(`api/role/deleteUserRole/`+roleId+"/"+boId,);
}