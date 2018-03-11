import { PageResult,add,del } from '../services/system/roleManagementService';
export default {
    namespace: 'roleManagement',
    state: {
        list: [],
        total: null,
        page: null,
        currentId: null,
    },
    reducers: {
        listState(state, { payload: { data: {data},total, page } }) {
            return { ...state, list:data ,total, page };
        },
    },
    effects: {
        *listInit({ payload :{page=1}}, { call, put }) {
            const  data  = yield call(PageResult, {page});
            yield put({
                type: 'listState',
                payload: {
                    data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *add({ payload: { name, des,callback,page} }, { call,put }) {
            yield call(add, { name, des});
            yield put({
                type: 'listInit',
                payload:{
                    paget:page
                }
            });
            callback();
        },
        *del({ payload: { id,page } }, { call, put }) {
            yield call(del, { id });
            yield put({
                type: 'listInit',
                payload:{
                    page:page
                }
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname,query }) => {
                if (pathname === '/system/roleManagementList') {
                    dispatch({ type: 'listInit',payload:query||{} });
                }
            });
        },
    },
};