import {userEditDB ,userEditRedis,userSaves} from '../services/system/userManagementService';
import { userDetail } from '../services/userDetailService';
import pathToRegexp from 'path-to-regexp'
export default {
    namespace: 'userEdit',
    state: {
        userInfo:null,
        userResource:[],
        resource:[],
        indeterminate: true,
        checkAll: false,
    },
    reducers: {
        listState(state, { payload:{data} }) {
            return { ...state, userInfo:data.userInfo,userResource:data.userResource,resource:data.dbResource};
        },
        redisList(state, { payload:{data}}) {
            return { ...state,userResource:data.userResource,resource:data.redisResource};
        },
    },
    effects: {
        *userEditDB({ payload:{userId} }, { call, put }) {
            const  {data}  = yield call(userEditDB,{userId});
            yield put({
                type: 'listState',
                payload: {
                    data:data
                },
            });
        },
        *userEditRedis({ payload:{userId} }, { call, put }) {
            const  {data}  = yield call(userEditRedis,{userId});
            yield put({
                type: 'redisList',
                payload: {
                    data:data
                },
            });
        },
        *userSaves({ payload:{userId,resource,type,callback} }, { call }) {
            yield call(userSaves,{userId,resource,type});
            const { data } = yield call(userDetail);
            sessionStorage.setItem('userResource', JSON.stringify(data.userResource));
            sessionStorage.setItem('userRedisResource', JSON.stringify(data.userRedisResource));
            sessionStorage.setItem('userMenu', JSON.stringify(data.userMenu));
            callback() 
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/system/userEdit/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'userEditDB' ,payload:{userId: match[1]}});
                }
            });
        },
    },
};