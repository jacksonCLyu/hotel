import { getDBAExamine ,executeSqlExamine} from '../services/sqlExamine/sqlDBAExamineService';
import pathToRegexp from 'path-to-regexp'
import { Modal } from 'antd';
export default {
    namespace: 'seeInformationDBA',
    state: {
        //数据库名
        dbName: null,
        //创建时间
        createTime: null,
        //申请人
        applicant: null,
        //进度
        sqlState: null,
        id:null,
        //实验库IP
        examineIp:null,
        //实验库端口
        examinePort:null,
        //审核人
        exerciserName:null,
        //审核时间
        updateTime:null,
        //执行时间
        elapseTime:null,
        //主库IP
        masterIp:null,
        //主库端口
        masterPort:null,
        //描述
        description:null,
        //sql语句
        sql:null,
        //异常原因
        error:null,
        //异常sql
        errorSql:null,
        //创建时间转换之后的格式
        create:null,
        //更新时间转换之后的格式
        update:null,
        stateName:null,
        submitType:null,
        items:[]
    },
    reducers: {
        listState(state, { payload: { data} }) {
            return { ...state, dbName: data.dbName, createTime:data.createTime, applicant:data.applicant, sqlState:data.state,
                    id:data.id,examineIp:data.examineIp,examinePort:data.examinePort,exerciserName:data.exerciserName,
                    updateTime:data.updateTime,elapseTime:data.elapseTime,masterIp:data.masterIp,masterPort:data.masterPort,
                    description:data.description,sql:data.sql,error:data.error||null,errorSql:data.errorSql||null,
                    create: data.create,update:data.update,stateName:data.stateName,submitType:data.submitType,items:data.items};
        },
    },
    effects: {
        *listInit({ payload: { id } }, { call, put }) {
            const  {data}  = yield call(getDBAExamine, { id });
            yield put({
                type: 'listState',
                payload: {
                    data,
                },
            });
        },
        *implementSql({ payload: { id ,callback} }, { call }) {
            const data=yield call(executeSqlExamine,{id});
            if (data.code==0) {
                Modal.success({
                    content: "执行成功",
                });
            }
            callback() 
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/SqlDBA/getDBAExamine/:id').exec(pathname)
                if (match) {
                    dispatch({ type: 'listInit' ,payload:{id: match[1]}});
                }
            });
        },
    },
};