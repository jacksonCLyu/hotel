import { getRedisResourceByPage,del } from '../services/system/redisManagementService';
export default {
    namespace: 'redisManagement',
    state: {
        list: [],
    },
    reducers: {
        listState(state, { payload: { data: {data},total, page } }) {
            return { ...state, list:data,total, page };
        },
    },
    effects: {
        *listInit({ payload:{page=1} }, { call, put }) {
            const  data  = yield call(getRedisResourceByPage, { page });
            yield put({
                type: 'listState',
                payload: {
                    data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *del({ payload: { id } }, { call, put }) {
            yield call(del, { id });
            yield put({
                type: 'listInit',
                payload:{
                    page:1
                }
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname,query }) => {
                if (pathname === '/system/redisManagementList') {
                    dispatch({ type: 'listInit' ,payload: query||{}});
                }
            });
        },
    },
};