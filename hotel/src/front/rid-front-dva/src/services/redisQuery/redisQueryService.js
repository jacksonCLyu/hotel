import { request, post, get,put,dele } from '../../utils/request';
import { URL, PAGE_SIZE } from '../../constants';

export function getRedisDBNum({redisID}){
    return get("api/resource/getRedisDBNum/"+redisID)
}

export function query({resourceId,key,type,dbNum}){
    return get("api/redisQuery/query",{
        resourceId,
        key,
        type,
        dbNum
    })
}
