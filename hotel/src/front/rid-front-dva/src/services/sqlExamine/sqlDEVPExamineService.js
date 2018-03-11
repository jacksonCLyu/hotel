import { request, post, get,dele } from '../../utils/request';
import { URL, PAGE_SIZE } from '../../constants';

export function sqlDEVPExamine({ page }) {
    return get(`api/sqlExamine/sqlDEVPExamine`, 
    {
        pageIndex: page,
        pageSize: PAGE_SIZE,
    });
}
export function getExamine ({id}){
    return get('api/sqlExamine/getExamine',
    {
        id
    })
}
export function deleteSqlExamine({id}){
    return dele('api/sqlExamine/deleteSqlExamine/'+id)
}

export function searchSqlDEVPExamine({id,dbName,userName,describe,sqlState,endDate, startDate,page}){
    return get('api/sqlExamine/searchSqlDEVPExamine',{
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