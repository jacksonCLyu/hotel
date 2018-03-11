import { getLastedStatus } from '../services/dbStatus/dbStatusService';
import pathToRegexp from 'path-to-regexp'
export default {
    namespace: 'dbStatus',
    state: {
        //数据库状态
        status: [],
        //冗余索引
        redundantIndex: [],
        //未使用索引
        unusedIndex: [],
        //索引使用状态
        indexUsageStatus: [],
        //线程连接数
        thread: [],
        //当前事务与活跃线程
        currentTransaction: [],
        //锁等待
        lockWait: [],
        dbName: null,
        dbID: null
    },
    reducers: {
        listState(state, { payload: { data: { data }, id } }) {
            if (data != undefined) {
                const version = data.dbVersion;
                if (version == 5.7) {
                    return {
                        ...state, status: data.status, redundantIndex: data.redundantIndex, unusedIndex: data.unusedIndex,
                        indexUsageStatus: data.indexUsageStatus, thread: data.thread,
                        currentTransaction: data.currentTransaction, lockWait: data.lockWait, dbName: data.dbName, dbID: id
                    };
                }
                else {
                    return { ...state, status: data.status, dbName: data.dbName, dbID: id };
                }
            } else {
                return {
                    ...state, status: [], redundantIndex: [], unusedIndex: [], indexUsageStatus: [], thread: [], currentTransaction: [], lockWait: [],
                    dbName: null,
                    dbID: id
                };
            }
        },
        init(state) {
            return {
                ...state, status: [], redundantIndex: [], unusedIndex: [],
                indexUsageStatus: [], thread: [],
                currentTransaction: [], lockWait: [], dbName: null, dbID: null
            };
        },
    },
    effects: {
        *getLastedStatus({ payload: { id } }, { call, put }) {
            const data = yield call(getLastedStatus, { resourceId: id });
            yield put({
                type: 'init',
            });
            yield put({
                type: 'listState',
                payload: {
                    id,
                    data: data
                }
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/performance/dbStatus/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'getLastedStatus', payload: { id: match[1] } });
                }
            });
        },
    },
};