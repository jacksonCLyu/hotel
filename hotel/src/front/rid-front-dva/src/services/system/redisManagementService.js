import {post,get,put,dele,} from '../../utils/request';
import { URL, PAGE_SIZE } from '../../constants';

export function getRedisResourceByPage({ id = 0 }) {
    return post(`resource/getRedisResourceByPage`, 
    { 
        pageIndex: 1,
        pageSize: PAGE_SIZE,
    });
}
// 删除
export function del({ id }) {
    return dele(`api/resource/deleteMasterRedisResource`, 
    {
        id,
    });
}

export function redisEdit({ redisId }) {
    return get(`api/resource/getRedisResource/`+redisId);
}
export function add({ redisName,ip, port, password,slaves }) {
    return post(`api/resource/addRedisResource`,{
        redisName,ip, port, password,slaves
    });
}
export function edit({id,redisName,ip, port, password,slaves}){
    return put(`api/resource/editMasterRedisResource/`+id,{
        redisName,ip, port, password,slaves
    });
}
