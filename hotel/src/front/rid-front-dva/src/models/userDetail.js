import { userDetail } from '../services/userDetailService';
import { edit} from "../services/system/userListService"
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
            sessionStorage.setItem('userMenu',JSON.stringify(data.userMenu));
            sessionStorage.setItem('user',JSON.stringify(data.user));
            yield put({
                type: 'listState',
                payload: {
                    userMenu
                },
            });
        },
        *editPassword({ payload: {id,userPassword,callback} }, { call, put }) {
            yield call(edit,{id,userPassword,userName:null,userId:null,userAge:null,userPhone:null});
            callback();
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