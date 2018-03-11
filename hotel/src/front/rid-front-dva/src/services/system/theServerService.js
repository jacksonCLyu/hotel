import {post,get,put,dele} from '../../utils/request';
import { URL, PAGE_SIZE } from '../../constants';

export function getServers({page}) {
    return get(`api/system/theServer`,{
        pageIndex: page,
        pageSize: PAGE_SIZE,
    });
}
// 删除
export function del({ id }) {
    return dele(`api/system/serverDelete/`+id);
}
// 添加服务器
export function add({ ip, ssh_user,port,password, remarks }) {
    return post(`api/system/addServer`, {  ip, ssh_user,port,password, remarks });
}
// 修改服务器
export function edit({ serverId, ip, ssh_user,port,password, remarks }) {
    return put(`api/system/editServer/`+serverId, { id:serverId, ip, ssh_user,port,password, remarks });
}

export function detailServer({serverId}){
    return get(`api/system/quertServer/`+serverId);
}