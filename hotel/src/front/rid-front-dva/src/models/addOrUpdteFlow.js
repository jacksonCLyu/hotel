import { addFlow, queryTaskFlow,updateFlow } from "../services/system/taskFlowService"
import { getTemplatesList } from "../services/system/flowTemplateService";
import { serverIpAndConfig } from '../services/system/mySqlExampleService';
import pathToRegexp from 'path-to-regexp'
export default {
    namespace: 'addOrUpdteFlow',
    state: {
        listTemplates: [],
        config: [],
        serverIP: [],
        name: null,
        flowTasks: [],
        taskFlowId: null,
        //重试的标志默认为0当为1的时候为重试
        restartFlg:0
    },
    reducers: {
        initState(state, { payload: { data } }) {
            return { ...state, listTemplates: data, taskFlowId: null, config: [], serverIP: [], name: null, flowTasks: [] ,restartFlg:0};
        },
        serverIpAndConfigState(state, { payload: { listConfig, listIP } }) {
            return { ...state, config: listConfig, serverIP: listIP };
        },
        updateState(state, { payload: { data } }) {
            return { ...state, taskFlowId: data.id, name: data.name, flowTasks: data.flowTasks };
        },
        restartState(state, { payload: { data } }) {
            return { ...state, taskFlowId: data.id, name: data.name,  flowTasks: data.flowTasks,restartFlg:1 };
        },
    },
    effects: {
        *listInit({ payload }, { call, put }) {
            const { data } = yield call(getTemplatesList);
            yield put({
                type: 'initState',
                payload: {
                    data: data,

                }
            });
        },
        *getServerAndConfig({ payload }, { call, put }) {
            const { data } = yield call(serverIpAndConfig);
            yield put({
                type: 'serverIpAndConfigState',
                payload: {
                    listConfig: data.listConfig,
                    listIP: data.listIP
                },
            });
        },
        *addFlow({ payload: { templateID, crateFlowParams,  name, callback } }, { call, put }) {
            let json = {
                templateId: templateID,
                params: crateFlowParams,
                name: name
            }
            const { data } = yield call(addFlow, { json });
            callback();
        },
        *queryTaskFlow({ payload: { id } }, { call, put }) {
            const { data } = yield call(queryTaskFlow, { id });
            yield put({
                type: 'updateState',
                payload: {
                    data: data,
                }
            });
        },
        *updateFlow({ payload: { id,templateID,crateFlowParams,blockIds, name, callback } }, { call, put }) {
            let json = {
                templateId: templateID,
                params: crateFlowParams,
                blockIds:blockIds,
                name: name
            }
            const { data } = yield call(updateFlow, { id,json });
            callback();
        },
        *restartTaskFlow({ payload: { id } }, { call, put }) {
            const { data } = yield call(queryTaskFlow, { id });
            yield put({
                type: 'restartState',
                payload: {
                    data: data,
                }
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/system/addFlow') {
                    dispatch({ type: 'listInit' });
                }
            });
        },
        update({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/system/updateTaskFlow/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'queryTaskFlow', payload: { id: match[1] } });
                }
            });
        },
        restart({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/system/restartTaskFlow/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'restartTaskFlow', payload: { id: match[1] } });
                }
            });
        },
    },
};