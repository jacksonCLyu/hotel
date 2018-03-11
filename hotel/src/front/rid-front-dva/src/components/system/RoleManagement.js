import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Modal } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';

const FormItem = Form.Item;


class RoleManagement extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            companyId: null,
            page: 1
        };
    }
    // 改变页面
    pageChangeHandler = (pagination) => {
        let page = pagination.current;
        this.setState({
            page: page
        })
        this.props.dispatch(routerRedux.replace({
            pathname: '/system/roleManagementList',
            query: { page }
        }));
    }
    // 取消
    roleCancel = () => {
        this.setState({
            modalVisible: false
        });
    }
    // 新增
    roleAdd = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: true,
        });
    }
    // 添加确认
    roleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {

                this.props.dispatch({
                    type: 'roleManagement/add',
                    payload: {
                        name: values.roleName,
                        des: values.roleDes,
                        callback: () => {
                            this.setState({
                                modalVisible: false
                            });
                        },
                        page: this.state.page
                    }
                });
            }
        });
    }
    // 删除
    delRole = (id) => {
        this.props.dispatch({
            type: 'roleManagement/del',
            payload: {
                id,
                page: this.state.page
            }
        });
    }
    render() {

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '操作',
                width: 100,
                render: (text, record) => (
                    <div>
                        <Link to={`/system/roleSee/${record.id}`}>查看</Link>
                        <Popconfirm title="确认删除?" onConfirm={() => { this.delRole(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];

        const props = this.props;
        let { list: dataSource, total, page: current } = props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        var url="/system/roleManagementList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="角色"
                    onOk={this.roleOk}
                    confirmLoading={props.loading}
                    onCancel={this.roleCancel}>
                    <Form layout="horizontal">
                        <FormItem label="名称" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('roleName', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="描述" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('roleDes', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
                <div className="clearfix">
                    <Button onClick={this.roleAdd} className="pull-right" type="primary" icon="plus">新增</Button>
                </div>
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
    const { list, total, page } = state.roleManagement;
    return {
        loading: state.loading.models.roleManagement,
        list,
        total,
        page
    };
}
RoleManagement = Form.create()(RoleManagement);
export default connect(mapStateToProps)(RoleManagement);