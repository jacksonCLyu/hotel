import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Modal, Select } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';

const FormItem = Form.Item;


class UserManagement extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            companyId: null,
            page:1
        };
    }
    // 添加用户
    userAdd = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: true,
        });
    }
    // 改变页面
    pageChangeHandler = (pagination) => {
        let page = pagination.current;
        this.setState({
            page:page
        })
        this.props.dispatch(routerRedux.replace({
            pathname: '/system/userManagementList',
            query: { page }
        }));
    }
    // 取消
    userCancel = () => {
        this.setState({
            modalVisible: false
        });
    }
    // 添加 -> 确认
    userOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'userManagement/add',
                    payload: {
                        id: values.boID,
                        callback: () => {
                            this.setState({
                                modalVisible: false
                            });
                        },
                    }
                });
            }
        });
    }
    // 删除
    delUser = (id) => {
        this.props.dispatch({
            type: 'userManagement/del',
            payload: {
                id,
                page:this.state.page
            }
        });
    }
    // 查询
    queryUser = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'userManagement/query',
                    payload: {
                        name: values.name,
                    }
                });
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
                title: '登录名',
                dataIndex: 'loginName',
                key: 'loginName',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '操作',
                width: 150,
                render: (text, record) => (
                    <div>
                        <Link to={`/system/userEdit/${record.id}`}>编辑</Link>
                        &nbsp;
                        <Link to={`/system/grantRelation/${record.id}`}>关注</Link>
                        <Popconfirm title="确认删除?" onConfirm={() => { this.delUser(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];

        const props = this.props;
        let { list: dataSource, total, page: current, users } = props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        var url="/system/userManagementList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="请输入用户姓名"
                    onOk={this.userOk}
                    confirmLoading={props.loading}
                    onCancel={this.userCancel}>
                    <Form layout="horizontal">
                        <FormItem label="用户姓名" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('boID', {

                            })(
                                <Select style={{ width: "100%" }} showSearch
                                    optionFilterProp="children"
                                    placeholder="请选择用户">
                                    {
                                        users.map((data, index) =>
                                            <Option value={data.id.toString()} key={index}>{data.name}</Option>
                                        )
                                    }
                                </Select>
                                )}
                        </FormItem>
                    </Form>
                </Modal>
                <div className="clearfix">
                    <div className="pull-left">
                        <Form layout="inline">
                            <FormItem label="姓名" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('name', {
                                })(<Input placeholder="姓名" />)}
                            </FormItem>
                            <Button onClick={this.queryUser}  type="primary" icon="search" >筛选</Button>
                        </Form>
                    </div>
                     {/* <div className="pull-right">
                        <Button onClick={this.userAdd} className="pull-right" type="primary" icon="plus">新增</Button>
                    </div>  */}
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
    const { list, total, page, users } = state.userManagement;
    return {
        loading: state.loading.models.userManagement,
        list,
        total,
        page,
        users
    };
}
UserManagement = Form.create()(UserManagement);
export default connect(mapStateToProps)(UserManagement);