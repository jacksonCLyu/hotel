import { queryTables, exportDdl, exportTableData, querySchema, showProcessList, query, exportExcel, exportCsv, sqlTemplates, update, add, deleteTemplates } from '../services/dbquery/dbqueryService';
import saveAs from 'file-saver';
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'dbquery',
    state: {
        dbNameList: [],
        resourceId: null,
        columns: [],
        queryData: [],
        //查询数据的原生结果
        result: [],
        sqlTemplateList: []
    },
    reducers: {
        listState(state, { payload: { data: { data }, resourceId, sqlTemplateList } }) {
            return { ...state, dbNameList: data, resourceId: resourceId, columns: [], queryData: [], sqlTemplateList: sqlTemplateList.data };
        },
        querySchemaState(state, { payload: { data: { data } } }) {
            return { ...state, queryData: data.queryResult, columns: data.columns, result: data.result };
        },
    },
    effects: {
        *queryTables({ payload: { dbId } }, { call, put }) {
            const data = yield call(queryTables, { dbId });
            const sqlTemplateList = yield call(sqlTemplates, { dbId })
            yield put({
                type: 'listState',
                payload: {
                    data: data,
                    resourceId: dbId,
                    sqlTemplateList
                },
            });
        },
        *exportDdl({ payload: { resourceId, tableNames } }, { call, put }) {
            const data = yield call(exportDdl, { resourceId, tableNames });
            if (data.code == 0) {
                var eleLink = document.createElement('a');
                eleLink.download = "db_schema.sql";
                eleLink.style.display = 'none';
                // 字符内容转变成blob地址
                var blob = new Blob([data.data.split(";").join(";\n")], { type: "text/plain;charset=utf-8" });
                eleLink.href = URL.createObjectURL(blob);
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
            }
            else {
                Modal.error({
                    content: resp.error,
                });
            };
        },
        *exportTableData({ payload: { resourceId, tableNames } }, { call, put }) {
            const data = yield call(exportTableData, { resourceId, tableNames });
            var eleLink = document.createElement('a');
            eleLink.download = tableNames + ".sql";
            eleLink.style.display = 'none';
            eleLink.href = URL.createObjectURL(data);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
        },
        *querySchema({ payload: { resourceId, tableName, type } }, { call, put }) {
            const data = yield call(querySchema, { resourceId, tableName, type });
            if (!data) {
                return;
            }
            yield put({
                type: 'querySchemaState',
                payload: {
                    data: data,
                },
            });
        },
        *query({ payload: { resourceId, sql } }, { call, put }) {
            const data = yield call(query, { resourceId, sql });
            if (!data) {
                return;
            }
            yield put({
                type: 'querySchemaState',
                payload: {
                    data: data,
                },
            });
        },
        *showProcessList({ payload: { resourceId } }, { call, put }) {
            const data = yield call(showProcessList, { resourceId });
            if (!data) {
                return;
            }
            yield put({
                type: 'querySchemaState',
                payload: {
                    data: data,
                },
            });
        },
        *exportExcel({ payload: { resourceId, sql } }, { call, put }) {
            const data = yield call(exportExcel, { resourceId, sql });
            var eleLink = document.createElement('a');
            eleLink.download = "data.xlsx";
            eleLink.style.display = 'none';
            eleLink.href = URL.createObjectURL(data);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);

        },
        *exportCsv({ payload: { resourceId, sql } }, { call, put }) {
            const data = yield call(exportCsv, { resourceId, sql });
            var eleLink = document.createElement('a');
            eleLink.download = "data.csv";
            eleLink.style.display = 'none';
            eleLink.href = URL.createObjectURL(data);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
        },
        *update({ payload: { id, resourceId, name, sqlContent } }, { call, put }) {
            const data = yield call(update, { id, resourceId, name, sqlContent });
            if (data.code == 0) {
                Modal.success({
                    content: "更新成功",
                });
                yield put({
                    type: 'queryTables',
                    payload: {
                        dbId: resourceId
                    }
                });
            }
        },
        *add({ payload: { resourceId, name, sqlContent } }, { call, put }) {
            const data = yield call(add, { resourceId, name, sqlContent });
            if (data.data) {
                yield put({
                    type: 'queryTables',
                    payload: {
                        dbId: resourceId
                    }
                });
                Modal.success({
                    content: "添加成功",
                });
            }
        },
        *delete({ payload: { id, resourceId } }, { call, put }) {
            const data = yield call(deleteTemplates, { id });
            if (data.data) {
                yield put({
                    type: 'queryTables',
                    payload: {
                        dbId: resourceId
                    }
                });
                Modal.success({
                    content: "删除成功",
                });
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/dbquery/queryTables/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'queryTables', payload: { dbId: match[1] } });
                }
            });
        },
    },
};