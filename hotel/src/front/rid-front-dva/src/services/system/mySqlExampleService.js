import { request, post, get } from '../../utils/request';
import {  PAGE_SIZE } from '../../constants';

//实例列表
export function mySqlExample({page}) {
    return get(`api/system/mySqlExample`, {
        pageIndex: page,
        pageSize: PAGE_SIZE,
    });
}
//查询对应的服务器IP及配置信息
export function serverIpAndConfig() {
    return get(`api/system/serverIpAndConfig`, 
    );
}
// 创建实例
export function add({ dbName,  port, version, serverID, configID }) {
    return post(`api/system/createInstance`, { db_name:dbName,  port, mysql_version:version, serverID, configID });
}
// 删除
export function del({ id }) {
    return get(`system/deleteInstance`, 
    {
        id,
    });
}
// 启动
export function start({ id }) {
    return get(`api/system/startUpInstance`, 
    {
        id,
    });
}
//实例的日志
export function queryLog({ id }) {
    return get(`api/system/queryLog`, 
    {
        id,
    });
}