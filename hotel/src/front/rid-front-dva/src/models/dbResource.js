import { getDbResource, del, queryDbResource, queryRedisResource, dbEdit, delRedis } from '../services/system/dbResourceService';
import { add, start, serverIpAndConfig } from '../services/system/mySqlExampleService';
import { userDetail } from '../services/userDetailService';
import { Modal } from 'antd';
import { dataDict } from '../utils/dataDict';
export default {
    namespace: 'dbResource',
    state: {
        list: [],
        total: null,
        page: null,
        currentId: null,
        config: [],
        serverIP: [],
        listType: [],
        listServer: [],
        listRedis: [],
        totalRedis: null,
        pageRedis: null,
        slaves: [],
        examine: [],
        examineId: null,
        dbVersion: null,
        name: null,
        port: null,
        ip: null,
        id: null,
        typeName: null,
        type: null,
        server: null,
        resourceName: null,
        resourcePort: null,
    },
    reducers: {
        listState(state, { payload: { data, total, page } }) {
            return { ...state, list: data.listDbResource.data, listType: data.listType, listServer: data.listServer, total, page };
        },
        queryDbState(state, { payload: { data: { data }, total, page, type, serverIP, resourceName, resourcePort } }) {

            return { ...state, list: data, total, page, type: type, server: serverIP, resourceName: resourceName, resourcePort: resourcePort };
        },
        serverIpAndConfigState(state, { payload: { listConfig, listIP } }) {
            return { ...state, config: listConfig, serverIP: listIP };
        },
        queryRedisState(state, { payload: { data: { data }, total, page } }) {

            return { ...state, listRedis: data, totalRedis: total, pageRedis: page };
        },
        detailDbState(state, { payload: { data } }) {
            return { ...state, slaves: data.slaves, examine: data.examine, examineId: data.examineId, dbVersion: data.dbVersion, name: data.name, port: data.port, ip: data.ip, id: data.id, typeName: data.typeName };
        },
    },
    effects: {
        *listInit({ payload: { page = 1, type = null, server = null, resourceName = null, resourcePort = null } }, { call, put }) {
            let data = yield call(getDbResource, { page, type, server, resourceName, resourcePort });
            if (data.data.listDbResource.data.length == 0 && page > 1) {
                page = page - 1;
                data = yield call(getDbResource, { page, type, server, resourceName, resourcePort });
            }
            yield put({
                type: 'listState',
                payload: {
                    data: data.data,
                    total: parseInt(data.data.listDbResource.count, 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *del({ payload: { id, page, type, serverIP, resourceName, resourcePort } }, { call, put }) {
            yield call(del, { id });
            const { data } = yield call(userDetail);
            sessionStorage.setItem('userResource', JSON.stringify(data.userResource));
            sessionStorage.setItem('userRedisResource', JSON.stringify(data.userRedisResource));
            sessionStorage.setItem('userMenu', JSON.stringify(data.userMenu));
            yield put({
                type: 'listInit',
                payload: {
                    page: page,
                    type: type,
                    server: serverIP,
                    resourceName: resourceName,
                    resourcePort: resourcePort
                }
            });
        },
        *serverIpAndConfig({ payload }, { call, put }) {
            const { data } = yield call(serverIpAndConfig);
            yield put({
                type: 'serverIpAndConfigState',
                payload: {
                    listConfig: data.listConfig,
                    listIP: data.listIP
                },
            });
        },
        *add({ payload: { dbName, port, version, serverID, configID, callback, jumpPage } }, { call, put }) {
            const { data } = yield call(add, { dbName, port, version, serverID, configID });
            yield put({
                type: 'listInit',
                payload: {
                    page: 1
                }
            });
            if (data.state) {
                jumpPage();
                callback();
            } else {
                Modal.error({
                    content: data.result,
                });
            }

        },
        *queryDB({ payload: { page = 1, type, serverIP, resourceName, resourcePort } }, { call, put }) {
            const data = yield call(queryDbResource, { page, type, serverIP, resourceName, resourcePort });
            yield put({
                type: 'queryDbState',
                payload: {
                    data: data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                    type,
                    serverIP,
                    resourceName,
                    resourcePort
                },
            });
        },
        *queryRedis({ payload: { page = 1, redisIP, redisPort, redisName } }, { call, put }) {
            const data = yield call(queryRedisResource, { page, redisIP, redisPort, redisName });
            yield put({
                type: 'queryRedisState',
                payload: {
                    data: data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                },
            });
        },
        * start({ payload: { id, jumpPage } }, { call, put }) {
            const data = yield call(start, { id });
            yield put({
                type: 'listInit',
                payload: {
                    page: 1
                },
            });
            if (data.code == 0) {
                jumpPage();
            }
        },
        *detailDB({ payload: { dbID } }, { call, put }) {
            const { data } = yield call(dbEdit, { dbID });
            yield put({
                type: 'detailDbState',
                payload: {
                    data: data
                },
            });
        },
        *delRedis({ payload: { id } }, { call, put }) {
            yield call(delRedis, { id });
            yield put({
                type: 'queryRedis',
                payload: {
                    page: 1
                }
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen((path) => {
                if (path.pathname === '/system/dbResourceList') {
                    dispatch({ type: 'listInit', payload: path.query || {} });
                }
            });
        },
    },
};