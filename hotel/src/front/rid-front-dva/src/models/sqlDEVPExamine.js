import { sqlDEVPExamine ,getExamine,searchSqlDEVPExamine } from '../services/sqlExamine/sqlDEVPExamineService';
export default {
    namespace: 'sqlDEVPExamine',
    state: {
        list: [],
        total: null,
        page: null,
        currentId: null,
    },
    reducers: {
        listState(state, { payload: { data: {data},total, page } }) {
            return { ...state, list:data, total, page };
        },
    },
    effects: {
        *listInit({ payload:{page=1} }, { call, put }) {
            const  {data}  = yield call(sqlDEVPExamine, {page});
            yield put({
                type: 'listState',
                payload: {
                    data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *search({ payload: { page=1,id,dbName,userName,describe,sqlState,endDate, startDate, date } }, { call, put }) {
            const  {data}  = yield call(searchSqlDEVPExamine,{ id,dbName,userName,describe,sqlState,endDate, startDate ,page});
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
                if (pathname === '/sqlExamine/sqlDEVP') {
                    dispatch({ type: 'listInit',payload: query||{} });
                }
            });
        },
    },
};