import { getListRoom, add, exit, del,book } from "../services/system/roomListService"
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'roomList',
    state: {
        list: [],
    },
    reducers: {
        initState(state, { payload: { data } }) {
            return { ...state, list: data };
        },
    },
    effects: {
        *listInit({ payload }, { call, put }) {
            const { data } = yield call(getListRoom);
            yield put({
                type: 'initState',
                payload: {
                    data: data,
                }
            });
        },
        *add({ payload: { id,roomNumber, price,standard,callback}}, { call, put }) {
            yield call(add,{id,roomNumber, price,standard});
            yield put({
                type: 'listInit',
            });
            callback();
        },
        *exit({ payload: {id,roomNumber, price,standard,flg,callback } }, { call, put }) {
            yield call(exit,{id,roomNumber, price,standard,flg});
            yield put({
                type: 'listInit',
            });
            callback();
        },
        *book({ payload: {id,roomNumber, price,userId,checkTime,leaveTime,jumpPage } }, { call, put }) {
            yield call(book,{roomNumber, price,userId,checkTime,leaveTime});
            jumpPage();
        },
        *del({ payload: { id } }, { call, put }) {
            const data = yield call(del, { id });
            if (data.code == 0) {
                yield put({
                    type: 'listInit',
                });
            } else {
                Modal.error({
                    content: "删除失败",
                });
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/system/roomList') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};