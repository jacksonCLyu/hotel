import { userDetail } from '../services/userDetailService';
export default {
    namespace: 'userDetail',
    state: {
          userMenu:[]
    },
    reducers: {
        listState(state, { payload: { data } }) {
            return { ...state, userMenu:data};
        },
    },
    effects: {
        *listInit({ payload }, { call, put }) {
            const  {data}=yield call(userDetail);
            sessionStorage.setItem('userMenu',JSON.stringify(data));
            yield put({
                type: 'listState',
                payload: {
                    data
                },
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen((path) => {
                if (path.pathname === '/') {
                    dispatch({ type: 'listInit' });
                }
            });
        },
    },
};