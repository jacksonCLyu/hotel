import {redisEdit,add,edit } from '../services/system/redisManagementService';
import pathToRegexp from 'path-to-regexp'
export default {
    namespace: 'redis',
    state: {
        slaves:[],
        password:null,
        name:null,
        port:null,
        ip:null,
        id:null
    },
    reducers: {
        listState(state, { payload: { data } }) {
            return { ...state, slaves: data.slaves,  password: data.password, name: data.name, port: data.port, ip: data.ip, id: data.id };
        },
        addState(state) {
            return { ...state,slaves:[],password:null,name:null,port:null,ip:null,id:null };
        },
    },
    effects: {
        *redisEdit({ payload: { redisId } }, { call, put }) {
            const { data } = yield call(redisEdit, { redisId });
            yield put({
                type: 'listState',
                payload: {
                    data: data
                },
            });
        },
        *edit({ payload: { id, redisName,ip, port, password, slaves, callback } }, { call }) {
            yield call(edit, { id,redisName,ip, port, password,slaves:JSON.stringify(slaves)});
            callback();
        },
        *addInit({ payload}, { call,put }) {
            yield put({
                type: 'addState',
            });
        },
       
        *add({ payload: { redisName,ip, port, password, slaves, callback } }, { call }) {
            yield call(add, { redisName,ip, port, password,slaves:JSON.stringify(slaves)});
            callback();
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/system/resource/redisEdit/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'redisEdit', payload: { redisId: match[1] } });
                }
            });
        },
        add({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/system/resource/addRedis') {
                    dispatch({ type: 'addInit' });
                }
            });
        },
    },
};