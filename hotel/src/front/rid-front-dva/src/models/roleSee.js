import { getRoleUsers, selectUsers, addUserRole, deleteUserRole } from '../services/system/roleManagementService';
import { userDetail } from '../services/userDetailService';
import pathToRegexp from 'path-to-regexp'
export default {
    namespace: 'roleSee',
    state: {
        list: [],
        users: [],
        roleId: null,
        total: null,
        page: null,
    },
    reducers: {
        listState(state, { payload: { data: { data }, roleId, total, page } }) {
            return { ...state, list: data, roleId: roleId, total, page };
        },
        listUsersState(state, { payload: { data } }) {
            return { ...state, users: data.value };
        },

    },
    effects: {
        *listInit({ payload: { roleId, page = 1 } }, { call, put }) {
            let data = yield call(getRoleUsers, { roleId, page });
            if (data.data.length == 0 && page > 1) {
                page = page - 1;
                data = yield call(getRoleUsers, { roleId, page })
            }
            const listUsers = yield call(selectUsers, { roleId });
            yield put({
                type: 'listState',
                payload: {
                    data,
                    roleId,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                },
            });
            yield put({
                type: 'listUsersState',
                payload: {
                    data: listUsers.data,
                },
            });
        },
        *add({ payload: { id, roleId, page, callback } }, { call, put }) {
            yield call(addUserRole, { boId: id, roleId });
            yield put({
                type: 'listInit',
                payload: {
                    roleId,
                    page
                },
            });
            const { data } = yield call(userDetail);
            sessionStorage.setItem('userResource', JSON.stringify(data.userResource));
            sessionStorage.setItem('userRedisResource', JSON.stringify(data.userRedisResource));
            sessionStorage.setItem('userMenu', JSON.stringify(data.userMenu));
            callback();
        },
        *deleteUserRole({ payload: { boId, page, roleId } }, { call, put }) {
            yield call(deleteUserRole, { boId, roleId });
            yield put({
                type: 'listInit',
                payload: {
                    roleId,
                    page
                },
            });
            const { data } = yield call(userDetail);
            sessionStorage.setItem('userResource', JSON.stringify(data.userResource));
            sessionStorage.setItem('userRedisResource', JSON.stringify(data.userRedisResource));
            sessionStorage.setItem('userMenu', JSON.stringify(data.userMenu));
        },
        *query({ payload: { roleId, name } }, { call, put }) {
            const data = yield call(getRoleUsers, { roleId, name, page: 1 });
            yield put({
                type: 'listState',
                payload: {
                    data,
                    roleId,
                    total: parseInt(data.count, 10),
                },
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/system/roleSee/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'listInit', payload: { roleId: match[1] } });
                }
            });
        },
    },
};