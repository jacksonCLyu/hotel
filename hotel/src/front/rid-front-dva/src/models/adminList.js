import { getAdminList,addAdmin ,del,editAdmin} from "../services/system/userListService"
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'adminList',
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
            const {data} = yield call(getAdminList);
            yield put({
                type: 'initState',
                payload: {
                    data: data,
                }
            });
        },
        *addAdmin({ payload: {id,userAccount,userPassword,userName,userPhone,callback} }, { call, put }) {
            yield call(addAdmin,{id,userAccount,userPassword,userName,userPhone});
            yield put({
                type: 'listInit',
            });
            callback();
        },
        *editAdmin({ payload: {id,userPassword,userName,userPhone,callback} }, { call, put }) {
            yield call(editAdmin,{id,userPassword,userName,userPhone});
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
                if (pathname === '/system/adminList') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};