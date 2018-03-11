import { getListUser,add ,del,edit} from "../services/system/userListService"
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'userList',
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
            const {data} = yield call(getListUser);
            yield put({
                type: 'initState',
                payload: {
                    data: data,
                }
            });
        },
        *add({ payload: {id,userAccount,userPassword,userName,userId,userAge,userPhone,callback} }, { call, put }) {
            yield call(add,{id,userAccount,userPassword,userName,userId,userAge,userPhone});
            yield put({
                type: 'listInit',
            });
            callback();
        },
        *edit({ payload: {id,userPassword,userName,userId,userAge,userPhone,callback} }, { call, put }) {
            yield call(edit,{id,userPassword,userName,userId,userAge,userPhone});
            yield put({
                type: 'listInit',
            });
            callback();
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
                if (pathname === '/system/userList') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};