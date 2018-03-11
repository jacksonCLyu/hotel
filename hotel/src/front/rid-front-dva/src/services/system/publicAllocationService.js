import {request,post,get,dele,put} from '../../utils/request';
import {  PAGE_SIZE } from '../../constants';

export function publicAllocation({page}) {
    return get(`api/system/publicAllocation`,{
        pageIndex: page,
        pageSize: PAGE_SIZE,
    });
}
// 添加
export function add({ configID, type, name, config }) {
    return post(`api/system/addTemplate`, {configID, type, name, configuration_information:config});
}
// 修改
export function edit({  configID, type, name, config }) {
    return put(`api/system/editTemplate/`+configID, {type, name, configuration_information:config });
}

// 删除
export function del({ id }) {
    return dele(`api/system/deleteTemplate/`+id);
}
export function getTemplate({configID}){
    return get('api/system/getTemplate/'+configID)
}
