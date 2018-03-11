import { mySqlExample, serverIpAndConfig, add, del, start,queryLog } from '../services/system/mySqlExampleService';
import { Modal } from 'antd';
export default {
    namespace: 'mySqlExample',
    state: {
        list: [],
        config: [],
        serverIP: [],
        total: null,
        page: 1,
    },
    reducers: {
        listState(state, { payload: {  data:{data},total, page   } }) {
            return { ...state, list: data,total, page };
        },
        serverIpAndConfigState(state, { payload: { data } }) {
            return { ...state, config: data.listConfig, serverIP: data.listIP };
        },
        logState(state, { payload: { data: { data } } }) {
            return { ...state, list: data };
        },
    },
    effects: {
        *listInit({ payload:{page=1} }, { call, put }) {
            const  data  = yield call(mySqlExample,{page});
            yield put({
                type: 'listState',
                payload: {
                    data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *serverIpAndConfig({ payload: { version } }, { call, put }) {
            if (version === null) {
                yield put({
                    type: 'serverIpAndConfigState',
                    payload: {
                        data: [],
                    },
                });
                return false;
            }
            const { data } = yield call(serverIpAndConfig);
            yield put({
                type: 'serverIpAndConfigState',
                payload: {
                    data,
                },
            });
        },
        *add({ payload: { dbName, port, version, serverID, configID,callback } }, { call,put }) {
            const  {data} =yield call(add, { dbName, port, version, serverID, configID });
            yield put({
                type: 'listInit',
            });
            if(data.state){
                callback();
            }else{
                Modal.error({
                    content: data.result,
                  });
                callback();
            }
            
        },
        *del({ payload: { id } }, { call, put }) {
            yield call(del, { id });
            yield put({
                type: 'listInit',
            });
        },
        *start({ payload: { id } }, { call, put }) {
            yield call(start, { id });
            yield put({
                type: 'listInit',
            });
        },
        // *query({ payload: { endDate, startDate, state, date } }, { call, put }) {
        //     const { data } = yield call(getChangePhoneAudits,{ endDate, startDate, state });
        //     yield put({
        //         type: 'listState',
        //         payload: {
        //             data,
        //         },
        //     });
        // },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname,query }) => {
                if (pathname === '/system/exampleLog') {
                    dispatch({ type: 'listInit',payload: query||{} });
                }
            });
        },
    },
};