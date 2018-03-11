import { request, post, get,put,dele } from '../../utils/request';
import { URL, PAGE_SIZE } from '../../constants';

export function sqlDBAExamine({ page }) {
    return get(`api/sqlExamine/sqlDBAExamine`, 
    {
        pageIndex: page,
        pageSize: PAGE_SIZE,
    });
}
export function getDBAExamine({id}){
    return get('api/sqlExamine/getDBAExamine',{
        id
    });
}
export function executeSqlExamine({id}){
    return put('api/sqlExamine/executeSqlExamine/'+id);
}
export function searchSqlDBAExamine({id,dbName,userName,describe,sqlState,endDate, startDate,page}){
    return get('api/sqlExamine/searchSqlDBAExamine',{
        id,
        dbName,
        applicant:userName,
        desc:describe,
        states:sqlState,
        endTime:endDate, 
        beginTime:startDate,
        pageIndex: page,
        pageSize: PAGE_SIZE,
    });
}