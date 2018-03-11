import { publicAllocation ,add,edit,del,getTemplate} from '../services/system/publicAllocationService';
export default {
    namespace: 'publicAllocation',
    state: {
        list: [],
        configID: null,
        name: null,
        config: null,
        configType:null,
        citationTimes:null,
        resourceType:[],
        total: null,
        page: 1,
    },
    reducers: {
        listState(state, { payload: {listTemplate,resourceType,total, page } }) {
            return { ...state, list:listTemplate.data,resourceType:resourceType,total, page};
        },
        detailConfigState(state,{payload:{data}}){
            return {...state,configID:data.id,name:data.name,configType:data.typeName,citationTimes:data.citation_times,config:data.configuration_information};
        }
    },
    effects: {
        *listInit({  payload:{page=1} }, { call, put }) {
            const  { data }  = yield call(publicAllocation,{page});
            yield put({
                type: 'listState',
                payload: {
                    listTemplate:data.listTemplate,
                    resourceType:data.resourceType,
                    total: parseInt(data.listTemplate.count, 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *add({ payload: { configID, type, name, config,callback,page} }, { call,put }) {
            yield call(add, { configID, type, name, config });
            yield put({
                type: 'listInit',
                payload: {
                    page: page
                }
            });
            callback();
        },
        *del({ payload: { id,page } }, { call, put }) {
            yield call(del, { id });
            yield put({
                type: 'listInit',
                payload: {
                    page: page
                }
            });
        },
        *edit({ payload: { configID, type, name, config,callback,page } }, { call, put }) {
            yield call(edit, { configID, type, name, config });
            yield put({
                type: 'listInit',
                payload: {
                    page: page
                }
            });
            callback();
        },
        *detailConfig({payload:{configID}},{ call, put }){
            const  {data} = yield call(getTemplate,{configID});
            yield put({
                type: 'detailConfigState',
                payload: {
                    data:data
                },
            });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname,query }) => {
                if (pathname === '/system/confList') {
                    dispatch({ type: 'listInit', payload: query||{}});
                }
            });
        },
    },
};