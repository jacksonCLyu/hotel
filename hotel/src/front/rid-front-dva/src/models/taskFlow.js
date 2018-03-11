import { getTaskFlow, del,runFlow } from "../services/system/taskFlowService"
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'taskFlow',
    state: {
        list: null,
        total: null,
        page: null,
    },
    reducers: {
        initState(state, { payload: { data, total, page } }) {
            return { ...state, list: data, total, page };
        },
    },
    effects: {
        *listInit({ payload: { page = 1 } }, { call, put }) {
            const data = yield call(getTaskFlow, { page });
            yield put({
                type: 'initState',
                payload: {
                    data: data.data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                }
            });
        },
        *del({ payload: { id, page } }, { call, put }) {
            const data = yield call(del, { id });
            if (data.code == 0) {
                yield put({
                    type: 'listInit',
                    payload: {
                        page: page
                    }
                });
            } else {
                Modal.error({
                    content: "删除失败",
                });
            }
        },
        *run({ payload: { id } }, { call, put }){
            const data = yield call(runFlow, { id });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/system/taskFlow') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};