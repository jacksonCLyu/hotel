import { getUsersByPage,getLdapUsers,del } from '../services/system/userManagementService';
export default {
    namespace: 'userManagement',
    state: {
        list: [],
        total: null,
        page: null,
        currentId: null,
        users:[]
    },
    reducers: {
        listState(state, { payload: { data:{data},total, page } }) {
            return { ...state, list:data ,total, page };
        },
        listUsersState(state, { payload: { data } }) {
            return { ...state, users:data.value  };
        },

    },
    effects: {
        *listInit({ payload:{page=1} }, { call, put }) {
            const  {data}  = yield call(getUsersByPage, { page });
            const ldapUser = yield call(getLdapUsers);
            yield put({
                type: 'listState',
                payload: {
                    data:data.userPage,
                    total: parseInt(data.userPage.count, 10),
                    page: parseInt(page, 10),
                },
            });
            yield put({
                type: 'listUsersState',
                payload: {
                    data:ldapUser.data,
                },
            });
        },
       
        *del({ payload: { id,page } }, { call, put }) {
            yield call(del, { id });
            yield put({
                type: 'listInit',
                payload: {
                    page:page,
                },
            });
        },
        *query({ payload:{page=1,name} }, { call, put }) {
            const  {data}  = yield call(getUsersByPage, { page,name });
            const ldapUser = yield call(getLdapUsers);
            yield put({
                type: 'listState',
                payload: {
                    data:data.userPage,
                    total: parseInt(data.userPage.count, 10),
                    page: parseInt(page, 10),
                },
            });
            yield put({
                type: 'listUsersState',
                payload: {
                    data:ldapUser.data,
                },
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname,query }) => {
                if (pathname === '/system/userManagementList') {
                    dispatch({ type: 'listInit',payload: query||{} });
                }
            });
        },
    },
};