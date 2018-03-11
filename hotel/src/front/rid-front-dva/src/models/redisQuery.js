import { getRedisDBNum, query } from '../services/redisQuery/redisQueryService';
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'redisQuery',
    state: {
        dbNum: [],
        redisID: null,
        result: null,
    },
    reducers: {
        listState(state, { payload: { data: { data }, redisID } }) {
            if (data != undefined) {
                return { ...state, dbNum: data.dbNum, redisID: redisID };
            } else {
                return { ...state, dbNum: [], redisID: redisID };
            }
        },
        queryState(state, { payload: { data: { data } } }) {
            return { ...state, result: data }
        }
    },
    effects: {
        *init({ payload: { redisID } }, { call, put }) {
            const data = yield call(getRedisDBNum, { redisID });
            yield put({
                type: 'listState',
                payload: {
                    data: data,
                    redisID
                },
            });
        },
        *query({ payload: { resourceId, key, type, dbNum } }, { call, put }) {
            const data = yield call(query, { resourceId, key, type, dbNum });
            if (data.data) {
                yield put({
                    type: 'queryState',
                    payload: {
                        data: { data },
                    }
                })
            } else {
                Modal.success({
                    content: "无查询结果",
                });
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/redis/redisQuery/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'init', payload: { redisID: match[1] } });
                }
            });
        },
    },
};