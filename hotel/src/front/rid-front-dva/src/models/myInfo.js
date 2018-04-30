import { getUser,edit} from "../services/system/userListService"
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'myInfo',
    state: {
        userInfo: {},
    },
    reducers: {
        initState(state, { payload: { data } }) {
            return { ...state, userInfo: data };
        },
    },
    effects: {
        *listInit({ payload}, { call, put }) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            let id=user.id;
            const {data} = yield call(getUser,{id});
            yield put({
                type: 'initState',
                payload: {
                    data: data,
                }
            });
        },
        *edit({ payload: {id,userPassword,userName,userId,userAge,userPhone,callback} }, { call, put }) {
            yield call(edit,{id,userPassword,userName,userId,userAge,userPhone});
            yield put({
                type: 'listInit',
            });
            callback();
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/system/myInfo') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};