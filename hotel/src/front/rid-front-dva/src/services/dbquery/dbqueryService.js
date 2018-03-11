import { request, post, get,put,dele } from '../../utils/request';

export function queryTables({ dbId }) {
    return get(`api/dbquery/getTables/` + dbId);
}

export function exportDdl({ resourceId, tableNames }) {
    const str = tableNames.join(',')
    return post(`api/dbquery/exportDdlNew`, {
        resourceId: resourceId,
        tableNames: str
    });
}
export function exportTableData({ resourceId, tableNames }) {
    const str = tableNames.join(',')
    return get(`api/dbquery/exportTableDataNew/` + resourceId + "/" + tableNames);
}
export function querySchema({ resourceId, tableName, type }) {
    return get(`api/dbquery/querySchema`, {
        resourceId,
        tableName,
        type
    });
}

export function showProcessList({ resourceId }) {
    return get(`api/dbquery/showProcessList`, {
        resourceId,
    });
}
export function query({ resourceId, sql }) {
    return get(`api/dbquery/query`, {
        resourceId,
        sql
    });
}
export function exportExcel({ resourceId, sql }) {
    return get(`api/dbquery/exportExcel`, {
        resourceId,
        sql
    });
}
export function exportCsv({ resourceId, sql }) {
    return get(`api/dbquery/exportCsv`, {
        resourceId,
        sql
    });
}

export function sqlTemplates({ dbId }) {
    return get(`api/sqlTemplates`, {
        resourceId: dbId
    });
}
export function update({ id, resourceId, name, sqlContent }) {
    return put(`api/sqlTemplates/` + id, {
        resourceId, name, sqlContent
    });
}
export function add({ resourceId, name, sqlContent }) {
    return post(`api/sqlTemplate`, {
        resourceId, name, sqlContent
    });
}

export function deleteTemplates({ id }) {
    return dele("api/sqlTemplates/"+id)
}