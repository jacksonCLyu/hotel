import React from 'react';
import { connect } from 'dva';
import { Modal, Table, Button, Input, Popconfirm, Tag, Form } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import Popover from 'antd/lib/popover';
const FormItem = Form.Item;
class AdminList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }
    // // 改变页面
    // pageChangeHandler = (pagination) => {
    //     let page = pagination.current;
    //     this.props.dispatch(routerRedux.replace({
    //         pathname: '/system/taskFlow',
    //         query: { page }
    //     }));
    // }
    add = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: true,
            id: null, userAccount: null, userPassword: null, userName: null, userPhone: null
        })
    }
    Cancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('userPassword')) {
            callback('两次输入的密码不匹配!');
        } else {
            callback();
        }
    }
    del = (id) => {
        this.props.dispatch({
            type: 'adminList/del',
            payload: {
                id,
            }
        });
    }
    OK = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let id = this.state.id;
                console.log(id)
                if (id) {
                    this.props.dispatch({
                        type: 'adminList/editAdmin',
                        payload: {
                            id: id,
                            userPassword: values.userPassword,
                            userName: values.userName,
                            userPhone: values.userPhone,
                            callback: () => {
                                this.setState({
                                    modalVisible: false
                                });
                            },
                        }
                    });
                } else {
                    this.props.dispatch({
                        type: 'adminList/addAdmin',
                        payload: {
                            id: null,
                            userAccount: values.userAccount,
                            userPassword: values.userPassword,
                            userName: values.userName,
                            userPhone: values.userPhone,
                            callback: () => {
                                this.setState({
                                    modalVisible: false
                                });
                            },
                        }
                    });
                }
            }
        });
    }
    // 编辑
    edit = (id, userAccount, userPassword, userName, userPhone) => {
        let props = this.props;
        props.form.resetFields();
        this.setState({
            modalVisible: true,
            id, userAccount, userPassword, userName, userPhone
        });
    }
    render() {

        const columns = [
            {
                title: '账号',
                dataIndex: 'userAccount',
                key: 'userAccount',
            },
            {
                title: '用户',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '手机号',
                dataIndex: 'userPhone',
                key: 'userPhone'
            },
            {
                title: '操作',
                width: 100,
                render: (text, record) => (
                    <div>
                        <a onClick={() => { this.edit(record.id, record.userAccount, record.userPassword, record.userName, record.userPhone) }}>修改</a>
                        <Popconfirm title="确认删除?" onConfirm={() => { this.del(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];
        const props = this.props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };

        let { list } = props;
        var url = "/system/adminList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="添加用户"
                    onOk={this.OK}
                    confirmLoading={props.loading}
                    onCancel={this.Cancel}>
                    <Form layout="horizontal">
                        {
                            this.state.id == null && this.state.id == undefined? <FormItem label="账号" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('userAccount', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.userAccount || null
                            })(<Input />)}
                        </FormItem>:
                        <FormItem label="账号" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('userAccount', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.userAccount || null
                            })(<Input disabled/>)}
                            </FormItem>
                        }
                       
                        <FormItem label="用户姓名" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('userName', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.userName || null
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="用户密码" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('userPassword', {
                                rules: [
                                    {
                                        required: true, message: '请输入密码！'
                                    },
                                ],
                                initialValue: this.state.userPassword || null
                            })(<Input type="password" />)}
                        </FormItem>
                        <FormItem label="确认密码" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请确认密码！',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                                initialValue: this.state.userPassword || null
                            })(
                                <Input
                                    type="password"
                                />
                            )}
                        </FormItem>
                        <FormItem label="联系电话" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('userPhone', {

                                initialValue: this.state.userPhone || null
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
                <div className="clearfix">
                    <Button onClick={this.add} className="pull-right" type="primary" icon="plus">新增</Button>
                </div>
                <div className="box20" />
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={record => record.id}
                    loading={props.loading}
                    pagination={false}
                // //修改页面
                // onChange={this.pageChangeHandler}
                />
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { list } = state.adminList;
    return {
        loading: state.loading.models.adminList,
        list,
        // total,
        // page
    };
}
AdminList = Form.create()(AdminList);
export default connect(mapStateToProps)(AdminList);