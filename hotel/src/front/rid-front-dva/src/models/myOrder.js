import { getMyOrderInfo,del,pay} from "../services/system/orderListService"
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'myOrder',
    state: {
        list: [],
    },
    reducers: {
        initState(state, { payload: { data } }) {
            return { ...state, list: data };
        },
    },
    effects: {
        *listInit({ payload}, { call, put }) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            let id=user.id;
            const {data} = yield call(getMyOrderInfo,{id});
            yield put({
                type: 'initState',
                payload: {
                    data: data,
                }
            });
        },
        *pay({ payload: { id,userId,roomNumber,callback } }, { call, put }) {
            const data = yield call(pay, { id,userId,roomNumber });
            if (data.code == 0) {
                yield put({
                    type: 'listInit',
                });
            } else {
                Modal.error({
                    content: "支付失败",
                });
            }
            callback()
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
                if (pathname === '/system/myOrder') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};