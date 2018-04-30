import { getListMyRoom,unsubscribe} from "../services/system/myRoomService"
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'myRoom',
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
            const {data} = yield call(getListMyRoom,{id});
            yield put({
                type: 'initState',
                payload: {
                    data: data,
                }
            });
        },
        *unsubscribe({ payload: { roomNumber } }, { call, put }) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            let id=user.id;
            const data = yield call(unsubscribe, { id,roomNumber });
            if (data.code == 0) {
                Modal.success({
                    content: "退订成功,请到前台结算",
                });
                yield put({
                    type: 'listInit',
                });
            } else {
                Modal.error({
                    content: "退订失败请联系管理员",
                });
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/system/myRoom') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};