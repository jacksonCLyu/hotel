import { getTemplates, insertTemplate, del, getTemplate, updateTemplate } from "../services/system/flowTemplateService";
import pathToRegexp from 'path-to-regexp';
import { Modal } from 'antd';
export default {
    namespace: 'flowTemplate',
    state: {
        list: null,
        total: null,
        page: null,
        tags: [],
        id: null,
        name: null
    },
    reducers: {
        initState(state, { payload: { data, total, page } }) {
            return { ...state, list: data, total, page };
        },
        updateState(state, { payload: { data, id } }) {
            return { ...state, name: data.name, tags: data.flowTemplateTasks || [], id: id };
        },
        addState(state) {
            return { ...state, tags: [], id: null, name: null };
        },
    },
    effects: {
        *listInit({ payload: { page = 1 } }, { call, put }) {
            const data = yield call(getTemplates, { page });
            yield put({
                type: 'initState',
                payload: {
                    data: data.data,
                    total: parseInt(data.count, 10),
                    page: parseInt(page, 10),
                }
            });
        },
        *del({ payload: { id, page } }, { call, put }) {
            const data = yield call(del, { id });
            if (data.code == 0) {
                yield put({
                    type: 'listInit',
                    payload: {
                        page: page
                    }
                });
            } else {
                Modal.error({
                    content: "删除失败",
                });
            }
        },
        *addFlowTemplate({ payload: { json, callback } }, { call, put }) {
            const data = yield call(insertTemplate, { json });
            callback();
        },
        *getTemplate({ payload: { id } }, { call, put }) {
            const { data } = yield call(getTemplate, { id });
            yield put({
                type: 'updateState',
                payload: {
                    data: data,
                    id
                }
            });
        },
        *updateTemplate({ payload: { id, json, callback } }, { call, put }) {
            const data = yield call(updateTemplate, { id, json });
            callback();
        },
        //进入添加模版页面的设置
        *add({ payload }, { call, put }) {
            yield put({
                type: 'addState',
            });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/system/flowTemplate') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
        add({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/system/addFlowTemplate') {
                    dispatch({ type: 'add' });
                }
            });
        },
        update({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/system/updateflowTemplate/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'getTemplate', payload: { id: match[1] } });
                }
            });
        },
    },
};