import { getServers, add, del, edit,detailServer } from '../services/system/theServerService';
export default {
    namespace: 'theServer',
    state: {
        list: [],
        serverId: null,
        ip: null,
        instanceNumber:null,
        ssh_user: null,
        remarks: null,
        port:null,
        total: null,
        page: 1,
    },
    reducers: {
        listState(state, { payload: {  data: {data},total, page } }) {
            return { ...state, list: data ,total, page };
        },
        detailDbState(state, { payload: { data} }) {
            return { ...state, serverId:data.id ,ip:data.ip, ssh_user:data.ssh_user,remarks:data.remarks,instanceNumber:data.instance_number,port:data.port};
        },
    },
    effects: {
        *listInit({payload:{page=1}}, { call, put }) {
            const  data  = yield call(getServers,{page});
            yield put({
                type: 'listState',
                payload: {
                    data:data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *add({ payload: { serverId, ip, ssh_user,port,password,remarks, callback } }, { call, put }) {
            yield call(add, { serverId, ip, ssh_user, port,password,remarks });
            yield put({
                type: 'listInit',
                payload: {
                    page: 1
                }
            });
            callback();
        },
        *del({ payload: { id } }, { call, put }) {
            yield call(del, { id });
            yield put({
                type: 'listInit',
                payload: {
                    page: 1
                }
            });
        },
        *edit({ payload: { serverId, ip, ssh_user, port,password,remarks, callback } }, { call, put }) {
            yield call(edit, { serverId, ip, ssh_user,port,password, remarks });
            yield put({
                type: 'listInit',
                payload: {
                    page: 1
                }
            });
            callback();
        },
        *detailServer({ payload: { serverId} }, { call, put }) {
            const {data}=yield call(detailServer, { serverId });
            yield put({
                type: 'detailDbState',
                payload:{
                    data:data
                }
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname,query }) => {
                if (pathname === '/system/serverList') {
                    dispatch({ type: 'listInit',payload: query||{} });
                }
            });
        },
    },
};