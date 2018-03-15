import { getMyEvaOrComp,inserEvaOrComp ,delteEvaOrComp,updateEvaOrComp,getListEvaOrComp,replyEvaOrComp} from "../services/system/evaOrCompService"
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'complaints',
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
            const {data} = yield call(getListEvaOrComp,{flg:2});
            yield put({
                type: 'initState',
                payload: {
                    data: data,
                }
            });
        },
        *myEva({ payload:{userId}}, { call, put }) {
            const {data} = yield call(getMyEvaOrComp,{userId,flg:2});
            yield put({
                type: 'initState',
                payload: {
                    data: data,
                }
            });
        },
        *inserEvaOrComp({ payload: {userId,content,score,flg,callback} }, { call, put }) {
            yield call(inserEvaOrComp,{userId,content,score,flg:2});
            yield put({
                type: 'listInit',
            });
            callback();
        },
        *updateEvaOrComp({ payload: {id,content,score,callback} }, { call, put }) {
            yield call(updateEvaOrComp,{id,content,score});
            yield put({
                type: 'listInit',
            });
            callback();
        },
        *replyEvaOrComp({ payload: {id,reply,adminId,callback} }, { call, put }) {
            yield call(replyEvaOrComp,{adminId,evaId:id,reply});
            yield put({
                type: 'listInit',
            });
            callback();
        },
        *del({ payload: { id } }, { call, put }) {
            const data = yield call(delteEvaOrComp, { id });
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
                if (pathname === '/system/complaintsList') {
                    dispatch({ type: 'listInit', payload: query || {} });
                }
            });
        },
    },
};