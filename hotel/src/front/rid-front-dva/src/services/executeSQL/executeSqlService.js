import { request, post, get } from '../../utils/request';

export function addSqlExamine({ resourceId,desc,sqlType,sql,id }) {
    return post(`api/sqlExamine/addSqlExamineNew`, 
    {
        resourceId: resourceId,
        desc: desc,
        sqlType:sqlType,
        sql:sql,
        id:id
    });
}
export function addSqlFileExamineNew({resourceId,desc,sqlType,id}){
    return post('api/sqlExamine/addSqlFileExamineNew',{
        resourceId:resourceId,
        desc:desc,
        sqlType:sqlType,
        id:id,
    });
}
