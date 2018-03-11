import {  get } from '../../utils/request';
import { URL, PAGE_SIZE } from '../../constants';

export function getLastedStatus({ resourceId }){
    return get(`api/dbPerformance/getLastedStatus`, 
    {
        resourceId:resourceId
    });
}