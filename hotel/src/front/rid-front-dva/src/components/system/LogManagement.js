import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Modal } from 'antd';
import { routerRedux } from 'dva/router';
import MainLayout from '../MainLayout';

const FormItem = Form.Item;


class LogManagement extends React.Component {
    
    
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
            pathname: '/system/logManagementList',
            query: { page }
        }));
    }
    render() {

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: '25%',
            },
            {
                title: '用户名',
                dataIndex: 'personName',
                key: 'personName',
                width: '25%',
            },
            {
                title: '类型',
                dataIndex: 'resourceType',
                key: 'resourceType',
                width: '25%',
            },
            {
                title: '时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: '25%',
            },
        ];

        const props = this.props;
        let { list: dataSource, total, page: current } = props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        var url="/system/logManagementList";
        return (
            <MainLayout location={location} sider="system" url={url}>
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
    const { list, total, page } = state.logManagement;
    return {
        loading: state.loading.models.logManagement,
        list,
        total,
        page
    };
}
LogManagement = Form.create()(LogManagement);
export default connect(mapStateToProps)(LogManagement);
