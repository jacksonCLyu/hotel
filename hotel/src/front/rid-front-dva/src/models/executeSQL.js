import { addSqlExamine, addSqlFileExamine, addSqlFileExamineNew } from '../services/executeSQL/executeSqlService';
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'executeSQL',
    state: {
        resourceId: null,
    },
    reducers: {
        initState(state, { payload: { resourceId } }) {
            return { ...state, resourceId: resourceId };
        },
    },
    effects: {
        *getResourceId({ payload: { id } }, { call, put }) {
            yield put({
                type: 'initState',
                payload: {
                    resourceId: id
                }
            });
        },
        *addSqlExamine({ payload: { resourceId, desc, sqlType, sql, id = null,jumpPage } }, { call }) {
            const data = yield call(addSqlExamine, { resourceId, desc, sqlType, sql, id });
            if (data.code == 0) {
                Modal.success({
                    content: "SQL上传成功",
                });
                jumpPage()
            }
        },

        *addSqlFileExamineNew({ payload: { resourceId, desc, sqlType, id = null,jumpPage } }, { call }) {
            const data = yield call(addSqlFileExamineNew, { resourceId, desc, sqlType, id });
            if (data.code == 0) {
                Modal.success({
                    content: "SQL上传成功",
                });
                jumpPage()
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/request/executeSQL/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'getResourceId', payload: { id: match[1] } });
                }
            });
        },
    },
};