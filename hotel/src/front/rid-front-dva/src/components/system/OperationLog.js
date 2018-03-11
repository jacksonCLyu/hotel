import React from 'react';
import { connect } from 'dva';
import { Table,  Form, Tag } from 'antd';
import { routerRedux } from 'dva/router';
import MainLayout from '../MainLayout';
import {dataDict} from '../../utils/dataDict';
const FormItem = Form.Item;
class OperationLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            companyId: null
        };
    }
    // 改变页面
    pageChangeHandler = (pagination) => {
        let page = pagination.current;
        this.props.dispatch(routerRedux.replace({
            pathname: '/system/operationLog',
            query: { page }
        }));
    }
    render() {

        const columns = [
            {
                title: '流水号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '操作人',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: '操作类型',
                dataIndex: 'operation_type',
                key: 'operation_type',
                render: (text, record) => {
                    return (
                        <div>
                            {dataDict('operationType',record.operation_type,'-')}
                        </div>
                    );
                }
            },
            {
                title: '数据资源ID',
                dataIndex: 'data_id',
                key: 'data_id',
            },
            {
                title: '数据资源类型',
                dataIndex: 'data_type',
                key: 'data_type',
                render: (text, record) => {
                    return (
                        <div>
                            {dataDict('opertionResourceType',record.data_type,'-')}
                        </div>
                    );
                }
            },
            {
                title: '操作状态',
                dataIndex: 'operation_statu',
                key: 'operation_statu',
                render: (text, record) => {
                    const val = dataDict('opertionStatus',record.operation_statu,'-');
                    return (
                        <div>
                            <Tag color={val.match(/成功/img)?'#87d068':val.match(/失败/img)?'#f50':'transparent'}>
                                {val}
                            </Tag>
                        </div>
                    );
                }
            },
            {
                title: '操作时间',
                dataIndex: 'create_time',
                key: 'create_time',
            },
        ];

        const props = this.props;
        let { list: dataSource, total, page: current } = props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        var url="/system/operationLog";
        return (
            <MainLayout location={location} sider="system"url={url}>
                <div className="box20" />
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={record => record.id}
                    loading={props.loading}
                    pagination={{
                        total: total,
                        current: current,
                        pageSize: 10
                    }}
                    //修改页面
                    onChange={this.pageChangeHandler}
                />
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { list, total, page } = state.operationLog;
    return {
        loading: state.loading.models.operationLog,
        list,
        total,
        page
    };
}
OperationLog = Form.create()(OperationLog);
export default connect(mapStateToProps)(OperationLog);
