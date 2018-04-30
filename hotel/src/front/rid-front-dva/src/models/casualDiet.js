import { getListCasualDiet, insert,insertOtherOrders} from "../services/system/casualDietService"
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'casualDiet',
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
            const { data } = yield call(getListCasualDiet);
            yield put({
                type: 'initState',
                payload: {
                    data: data,
                }
            });
        },
        *order({ payload: { id,callback } }, { call, put }) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            let userId=user.id;
            const data = yield call(insertOtherOrders, { id,userId });
            if (data.code == 0) {
                yield put({
                    type: 'listInit',
                });
                Modal.success({
                    content: "订购成功",
                });
            } 
            callback();
        },
        *insert({ payload: {name,price,callback} }, { call, put }) {
            yield call(insert,{name,price});
            yield put({
                type: 'listInit',
            });
            callback();
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/system/casualDiet') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};