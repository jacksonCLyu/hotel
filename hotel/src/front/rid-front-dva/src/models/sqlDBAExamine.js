import { sqlDBAExamine ,getDBAExamine,searchSqlDBAExamine} from '../services/sqlExamine/sqlDBAExamineService';
export default {
    namespace: 'sqlDBAExamine',
    state: {
        list: [],
        total: null,
        page: null,
        currentId: null,
    },
    reducers: {
        listState(state, { payload: { data: { data }, total, page } }) {
            return { ...state, list: data, total, page };
        },
    },
    effects: {
        *listInit({ payload: { page = 1 } }, { call, put }) {
            const  {data}  = yield call(sqlDBAExamine, { page });
            yield put({
                type: 'listState',
                payload: {
                    data:data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                },
            });
        },

        *search({ payload: { page=1,id,dbName,userName,describe,sqlState,endDate, startDate, date } }, { call, put }) {
            const  {data}  = yield call(searchSqlDBAExamine,{ id,dbName,userName,describe,sqlState,endDate, startDate ,page});
            yield put({
                type: 'listState',
                payload: {
                    data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                },
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/sqlExamine/sqlDBA') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};