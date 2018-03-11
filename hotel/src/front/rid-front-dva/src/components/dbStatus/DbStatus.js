import React from 'react';
import { connect } from 'dva';
import { Table, Card } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import styles from '../style.less';
class DbStatus extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const columns = [
            {
                title: '主库IP',
                dataIndex: 'id',
                key: 'db_name',
            },
            {
                title: '主库端口',
                dataIndex: 'db_name',
                key: 'db_name',
            },
            {
                title: '从库IP',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: '从库端口',
                dataIndex: 'port',
                key: 'port',
            },
        ];
        const columns1 = [
            {
                title: '读超时时间',
                dataIndex: 'readTimeout',
                key: 'readTimeout',
            },
            {
                title: '写超时时间',
                dataIndex: 'writeTimeout',
                key: 'writeTimeout',
            },
            {
                title: '最大连接数',
                dataIndex: 'maxConnections',
                key: 'maxConnections',
            },
            {
                title: '已连接数',
                dataIndex: 'threadConnected',
                key: 'threadConnected',
            },
            {
                title: '缓存表数',
                dataIndex: 'tableOpenCache',
                key: 'tableOpenCache',
            },
            {
                title: '已打开表数',
                dataIndex: 'openTables',
                key: 'openTables',
            },
            {
                title: '打开文件数',
                dataIndex: 'openFiles',
                key: 'openFiles',
            },
            {
                title: '已打开文件数',
                dataIndex: 'openFilesLimit',
                key: 'openFilesLimit',
            },
            {
                title: '最大包数',
                dataIndex: 'maxAllowedPacket',
                key: 'maxAllowedPacket',
            },
        ];
        const columns2 = [
            {
                title: '表名',
                dataIndex: 'table_name',
                key: 'table_name',
            },
            {
                title: '冗余索引名',
                dataIndex: 'redundant_index_name',
                key: 'redundant_index_name',
            },
            {
                title: '冗余索引列',
                dataIndex: 'redundant_index_columns',
                key: 'redundant_index_columns',
            },
            {
                title: '主导索引名',
                dataIndex: 'dominant_index_name',
                key: 'dominant_index_name',
            },
            {
                title: '主导索引列',
                dataIndex: 'dominant_index_columns',
                key: 'dominant_index_columns',
            },
            {
                title: '删除冗余索引语句',
                dataIndex: 'sql_drop_index',
                key: 'sql_drop_index',
            },
        ];
        const columns3 = [
            {
                title: '表名',
                dataIndex: 'object_name',
                key: 'object_name',
            },
            {
                title: '索引名',
                dataIndex: 'index_name',
                key: 'index_name',
            },
        ];
        const columns4 = [
            {
                title: '表名',
                dataIndex: 'table_name',
                key: 'table_name',
            },
            {
                title: '索引名',
                dataIndex: 'index_name',
                key: 'index_name',
            },
            {
                title: '查询索引行',
                dataIndex: 'rows_selected',
                key: 'rows_selected',
            },
            {
                title: '插入索引行',
                dataIndex: 'rows_inserted',
                key: 'rows_inserted',
            },
            {
                title: '更新索引行',
                dataIndex: 'rows_updated',
                key: 'rows_updated',
            },
            {
                title: '删除索引行',
                dataIndex: 'rows_deleted',
                key: 'rows_deleted',
            },
        ];
        const columns5 = [
            {
                title: '变量名',
                dataIndex: 'Variable_name',
                key: 'Variable_name',
            },
            {
                title: '值',
                dataIndex: 'Value',
                key: 'Value',
            },
        ];
        const columns6 = [
            {
                title: '线程id',
                dataIndex: 'ID',
                key: 'ID',
            },
            {
                title: '用户名',
                dataIndex: 'USER',
                key: 'USER',
            },
            {
                title: '访问主机',
                dataIndex: 'HOST',
                key: 'HOST',
            },
            {
                title: '数据库',
                dataIndex: 'DB',
                key: 'DB',
            },
            {
                title: '线程时长',
                dataIndex: 'TIME',
                key: 'TIME',
            },
            {
                title: '事务id',
                dataIndex: 'trx_id',
                key: 'trx_id',
            },
            {
                title: '事务状态',
                dataIndex: 'trx_state',
                key: 'trx_state',
            },
            {
                title: '事务开始时间',
                dataIndex: 'trx_started',
                key: 'trx_started',
            },
            {
                title: '事务语句',
                dataIndex: 'trx_query',
                key: 'trx_query',
            },
            {
                title: '事务操作状态',
                dataIndex: 'trx_operation_state',
                key: 'trx_operation_state',
            },
            {
                title: '表使用个数',
                dataIndex: 'trx_tables_in_use',
                key: 'trx_tables_in_use',
            },
            {
                title: '行锁个数',
                dataIndex: 'trx_rows_locked',
                key: 'trx_rows_locked',
            },
            {
                title: '隔离级别',
                dataIndex: 'trx_isolation_level',
                key: 'trx_isolation_level',
            },
            {
                title: '唯一性检查',
                dataIndex: 'trx_unique_checks',
                key: 'trx_unique_checks',
            },
            {
                title: '外键检查',
                dataIndex: 'trx_foreign_key_checks',
                key: 'trx_foreign_key_checks',
            },
        ];
        const columns7 = [
            {
                title: '等待线程ID',
                dataIndex: 'waiting_trx_id',
                key: 'waiting_trx_id',
            },
            {
                title: '等待线程',
                dataIndex: 'waiting_thread',
                key: 'waiting_thread',
            },
            {
                title: '等待查询',
                dataIndex: 'waiting_query',
                key: 'waiting_query',
            },
            {
                title: '阻塞线程ID',
                dataIndex: 'blocking_trx_id',
                key: 'blocking_trx_id',
            },
            {
                title: '阻塞线程',
                dataIndex: 'blocking_thread',
                key: 'blocking_thread',
            },
            {
                title: '阻塞查询',
                dataIndex: 'blocking_query',
                key: 'blocking_query',
            },
        ];
        const props = this.props;
        let { status,redundantIndex,unusedIndex,indexUsageStatus,thread,currentTransaction,lockWait,dbName ,dbID} = props;
        var url ="performance/dbStatus/"+dbID;
        return (//1,sub4,dbn_pm
            
            <MainLayout location={location} sider="system" url={url}>
                <div className="box20" />
                {/* <Card title="数据库信息" className={styles.card} bordered={false}>
                    <Table columns={columns} dataSource={list} rowKey={record => record.id} loading={props.loading} pagination={false}/>
                </Card> */}
                <Card title="数据库状态" className={styles.card} bordered={false}>
                    <Table columns={columns1} dataSource={status} rowKey={record => record.id} loading={props.loading} pagination={false}/>
                </Card>
                <Card title="冗余索引" className={styles.card} bordered={false}>
                    <Table columns={columns2} dataSource={redundantIndex} rowKey={record => record.id} loading={props.loading} pagination={false}/>
                </Card>
                <Card title="未使用索引" className={styles.card} bordered={false}>
                    <Table columns={columns3} dataSource={unusedIndex} rowKey={record => record.id} loading={props.loading} pagination={false}/>
                </Card>
                <Card title="索引使用状态" className={styles.card} bordered={false}>
                    <Table columns={columns4} dataSource={indexUsageStatus} rowKey={record => record.id} loading={props.loading} pagination={false}/>
                </Card>
                <Card title="线程连接数" className={styles.card} bordered={false}>
                    <Table columns={columns5} dataSource={thread} rowKey={record => record.id} loading={props.loading} pagination={false}/>
                </Card>
                <Card title="当前事务" className={styles.card} bordered={false}>
                    <Table columns={columns6} dataSource={currentTransaction} rowKey={record => record.id} loading={props.loading} pagination={false}/>
                </Card>
                <Card title="锁等待" className={styles.card} bordered={false}>
                    <Table columns={columns7} dataSource={lockWait} rowKey={record => record.id} loading={props.loading} pagination={false}/>
                </Card>
            </MainLayout >
        )
    }
}

const mapStateToProps = (state) => {
    const { status,redundantIndex,unusedIndex,indexUsageStatus,thread,currentTransaction,lockWait,dbName,dbID} = state.dbStatus;
    return {
        loading: state.loading.models.dbStatus,
        dbName,
        status,
        redundantIndex,
        unusedIndex,
        indexUsageStatus,
        thread,
        currentTransaction,
        lockWait,
        dbID
    };
}
export default connect(mapStateToProps)(DbStatus);