import {request,post,get} from '../../utils/request';
import { URL, PAGE_SIZE } from '../../constants';

export function getLogsByPage({page}) {
    return get(`api/system/getLogsByPage`,  
    {
        pageIndex: page,
        pageSize: PAGE_SIZE,
    });
}