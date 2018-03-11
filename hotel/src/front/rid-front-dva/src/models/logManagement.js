import { getLogsByPage } from '../services/system/logManagementService';
export default {
    namespace: 'logManagement',
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
        *listInit({ payload:{page=1} }, { call, put }) {
            const  data  = yield call(getLogsByPage, {page});
            yield put({
                type: 'listState',
                payload: {
                    data:data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                },
            });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname,query }) => {
                if (pathname === '/system/logManagementList') {
                    dispatch({ type: 'listInit',payload: query||{}  });
                }
            });
        },
    },
};