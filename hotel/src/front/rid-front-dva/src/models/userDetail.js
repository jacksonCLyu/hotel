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
            const  data=yield call(userDetail);
            const userMenu=data.userMenu
            console.log(userMenu)
            sessionStorage.setItem('userMenu',JSON.stringify(data.userMenu));
            sessionStorage.setItem('user',JSON.stringify(data.user));
            yield put({
                type: 'listState',
                payload: {
                    userMenu
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