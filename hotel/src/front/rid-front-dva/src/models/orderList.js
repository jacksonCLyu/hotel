import { getListOrderInfo,del} from "../services/system/orderListService"
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'orderList',
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
            const {data} = yield call(getListOrderInfo);
            yield put({
                type: 'initState',
                payload: {
                    data: data,
                }
            });
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
                if (pathname === '/system/orderList') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};