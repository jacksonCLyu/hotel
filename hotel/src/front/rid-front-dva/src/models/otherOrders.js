import { getListOtherOrders,del,getMyOtherOrders} from "../services/system/otherOrdersService"
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'otherOrders',
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
            let flg=user.flg;
            let userId=user.id;
            let data
            if(flg==1){
                data = yield call(getListOtherOrders);
            }else{
                data = yield call(getMyOtherOrders,{userId}); 
            }
            yield put({
                type: 'initState',
                payload: {
                    data: data.data,
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
                if (pathname === '/system/otherOrders') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};