import {queryLog } from '../services/system/mySqlExampleService';
import pathToRegexp from 'path-to-regexp'
export default {
    namespace: 'exampleLog',
    state: {
        exampleLog:null,
        page:null
    },
    reducers: {
        logState(state, { payload:  {data,page} }) {
            return { ...state, exampleLog: data.log,page:page };
        },
    },
    effects: {
        *queryLog({ payload:{id,page} }, { call, put }) {
            const  {data}  = yield call(queryLog,{id});
            yield put({
                type: 'logState',
                payload: {
                    data:data,
                    page
                },
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/system/exampleLog/:id/:page').exec(pathname)
                if (match) {
                    dispatch({ type: 'queryLog' ,payload:{id: match[1],page:match[2]}});
                }
            });
        },
    },
};