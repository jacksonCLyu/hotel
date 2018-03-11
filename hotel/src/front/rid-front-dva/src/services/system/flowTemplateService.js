import { post, get, put, dele } from '../../utils/request';
import { PAGE_SIZE } from '../../constants';

export function getTemplates({ page }) {
    return get("api/taskflow/templates", {
        pageIndex: page,
        pageSize: PAGE_SIZE,
    })
}
export function insertTemplate({ json }) {
    return post("api/taskflow/template", {
        ...json
    })
}
export function del({id}){
    return dele("api/taskflow/template/"+id)
}
export function getTemplate({id}){
    return get("api/taskflow/template/"+id)
}

export function updateTemplate({id,json}){
    return put("api/taskflow/template/"+id,{
        ...json
    })
}
export function getTemplatesList(){
    return get("api/taskflow/getTemplatesList")
}
