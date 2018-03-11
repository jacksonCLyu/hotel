import { getDbResource, del, dbEdit, edit,editSlaveDbResource,addSlaveDbResource ,deleteSlaveDbResource,addExamineDbResource,editExamineDbResource,deleteExamineDbResource} from '../services/system/dbResourceService';
import pathToRegexp from 'path-to-regexp'
export default {
    namespace: 'db',
    state: {
        slaves: [],
        examine: [],
        examineId: null,
        dbVersion: null,
        name: null,
        port: null,
        ip: null,
        id: null
    },
    reducers: {
        listState(state, { payload: { data } }) {
            return { ...state, slaves: data.slaves, examine: data.examine, examineId: data.examineId, dbVersion: data.dbVersion, name: data.name, port: data.port, ip: data.ip, id: data.id };
        },
    },
    effects: {
        *dbEdit({ payload: { dbID } }, { call, put }) {
            const { data } = yield call(dbEdit, { dbID });
            yield put({
                type: 'listState',
                payload: {
                    data: data
                },
            });
        },
        *edit({ payload: { id, dbName, ip, port, dbVersion, slaves, examine, callback } }, { call }) {
            yield call(edit, { id, dbName, ip, port, dbVersion,slaves:JSON.stringify(slaves),examine:JSON.stringify(examine)});
            callback();
        },
        *editSlaveDbResource({ payload: { id, ip, port, dbVersion } }, { call }) {
            yield call(editSlaveDbResource, { id, ip, port, dbVersion });
        },
        *addSlaveDbResource({ payload: { master, ip, port, dbVersion,callback } }, { call }) {
            yield call(addSlaveDbResource, { master, ip, port, dbVersion });
            callback();
        },
        *deleteSlaveDbResource({ payload: { id } }, { call }) {
            yield call(deleteSlaveDbResource, { id });
        },
        *editExamineDbResource({ payload: { id, ip, port, dbVersion } }, { call }) {
            yield call(editExamineDbResource, { id, ip, port, dbVersion });
        },
        *addExamineDbResource({ payload: { master, ip, port, dbVersion } }, { call }) {
            yield call(addExamineDbResource, { master, ip, port, dbVersion });
        },
        *deleteExamineDbResource({ payload: { id } }, { call }) {
            yield call(deleteExamineDbResource, { id });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/system/dbEdit/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'dbEdit', payload: { dbID: match[1] } });
                }
            });
        },
    },
};