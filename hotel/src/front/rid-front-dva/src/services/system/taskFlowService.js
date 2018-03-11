import { request, post, get, dele, put } from '../../utils/request';
import { URL, PAGE_SIZE } from '../../constants';

export function getTaskFlow({ page }) {
    return get(`api/taskflows`,
        {
            pageIndex: page,
            pageSize: PAGE_SIZE,
        });
}

export function del({ id }) {
    return dele("api/taskflow/" + id)
}

export function addFlow({ json }) {
    return post("api/taskflow", {
        ...json
    })
}

export function queryTaskFlow({ id }) {
    return get("api/taskflow/"+id)
}

export function updateFlow({ id,json }) {
    return put("api/taskflow/"+id,{
        ...json
    })
}

export function runFlow({ id }) {
    return put("api/taskFlow/run/"+id)
}