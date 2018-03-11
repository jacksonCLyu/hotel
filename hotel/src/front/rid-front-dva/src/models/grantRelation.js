import {getGrantRelation,selectGrantResources,addGrantResources,delGrantRelation} from '../services/system/userManagementService';
import pathToRegexp from 'path-to-regexp'
export default {
    namespace: 'grantRelation',
    state: {
        resources:[],
        grantUserId:null,
        selectResources:[]
    },
    reducers: {
        listState(state, { payload:{data,userId} }) {
            return { ...state, grantUserId:userId,resources:data.resources};
        },
        listSelectState(state, { payload: {data} }) {
            return { ...state, selectResources:data.value  };
        },
    },
    effects: {
        *grantRelation({ payload:{userId} }, { call, put }) {
           
            const  {data}  = yield call(getGrantRelation,{userId});

            const data1 = yield call(selectGrantResources,{userId});

            yield put({
                type: 'listState',
                payload: {
                    data,
                    userId
                },
            });
            yield put({
                type: 'listSelectState',
                payload: {
                    data:data1.data
                },
            });
        },
        *del({ payload: { id,userId } }, { call, put }) {
            yield call(delGrantRelation, { id });
            yield put({
                type: 'grantRelation',
                payload:{
                    userId:userId
                }
            });
        },
        *add({ payload: { resourceId,grantUserId,callback} }, { call,put }) {
            yield call(addGrantResources, { resourceId,grantUserId });
            yield put({
                type: 'grantRelation',
                payload: {
                    userId:grantUserId
                },
            });
            callback();
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/system/grantRelation/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'grantRelation' ,payload:{userId: match[1]}});
                }
            });
        },
    },
};