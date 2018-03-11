import { getExamine, deleteSqlExamine } from '../services/sqlExamine/sqlDEVPExamineService';
import { addSqlExamine, addSqlFileExamineNew } from '../services/executeSQL/executeSqlService';
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'seeInformationDEVP',
    state: {
        //数据库名
        dbName: null,
        //创建时间
        createTime: null,
        //申请人
        applicant: null,
        //进度
        sqlState: null,
        id: null,
        //实验库IP
        examineIp: null,
        //实验库端口
        examinePort: null,
        //审核人
        exerciserName: null,
        //审核时间
        updateTime: null,
        //执行时间
        elapseTime: null,
        //主库IP
        masterIp: null,
        //主库端口
        masterPort: null,
        //描述
        description: null,
        //sql语句
        sql: null,
        //异常原因
        error: null,
        //异常sql
        errorSql: null,
        //创建时间转换之后的格式
        create: null,
        //更新时间转换之后的格式
        update: null,
        //状态名称
        stateName: null,
        //数据库资源ID
        resourceId: null,
        //sql类型
        type: null,
        //sql提交类型
        submitType: null,
        items:[]
    },
    reducers: {
        listState(state, { payload: { data } }) {
            return {
                ...state, dbName: data.dbName, createTime: data.createTime, applicant: data.applicant, sqlState: data.state,
                id: data.id, examineIp: data.examineIp, examinePort: data.examinePort, exerciserName: data.exerciserName,
                updateTime: data.updateTime, elapseTime: data.elapseTime, masterIp: data.masterIp, masterPort: data.masterPort,
                description: data.description, sql: data.sql, error: data.error || null, errorSql: data.errorSql || null,
                create: data.create, update: data.update, stateName: data.stateName, resourceId: data.resourceId, type: data.type,
                submitType: data.submitType,items:data.items
            };
        },
    },
    effects: {
        *listInit({ payload: { id } }, { call, put }) {
            const { data } = yield call(getExamine, { id });
            yield put({
                type: 'listState',
                payload: {
                    data,
                },
            });
        },
        *delete({ payload: { id, callback } }, { call }) {
            const data = yield call(deleteSqlExamine, { id });
            callback();
        },
        *addSqlExamine({ payload: { resourceId, desc, sqlType, sql, id, callback } }, { call }) {
            const data = yield call(addSqlExamine, { resourceId, desc, sqlType, sql, id });
            if (data.code == 0) {
                Modal.success({
                    content: "SQL上传成功",
                });
            } 
            callback();
        },
        *addSqlFileExamineNew({ payload: { resourceId, desc, sqlType, id, callback } }, { call }) {
            const data = yield call(addSqlFileExamineNew, { resourceId, desc, sqlType, id });
            if (data.code == 0) {
                Modal.success({
                    content: "SQL上传成功",
                });
            }
            callback();
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/SqlDEVP/getDEVPExamine/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'listInit', payload: { id: match[1] } });
                }
            });
        },
    },
};