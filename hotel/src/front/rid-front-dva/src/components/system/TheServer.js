import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Modal, Row, Col, message } from 'antd';
import { routerRedux } from 'dva/router';
import MainLayout from '../MainLayout';

const FormItem = Form.Item;


class TheServer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            detailsModel: false
        };
    }
    // 新增服务器
    theServerAdd = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: true,
            serverId: null,
            ip: null,
            ssh_user: null,
            remarks: null
        });
    }
    // 取消
    theServerCancel = () => {
        this.setState({
            modalVisible: false
        });
    }
    // 添加/编辑 -> 确认
    theServerOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let serverList = this.props.list;
                let serverId = this.state.serverId;
                serverList = serverList.filter(it => it.ip == values.ip && it.ssh_user == values.ssh_user);
                if (serverList.length > 0) {
                    if (serverList.length > 0) {
                        if (serverId != null) {
                            serverList = serverList.filter(it => it.id != serverId)
                            if (serverList.length > 0) {
                                message.warning('该用户下的服务器已存在,请检查');
                                return;
                            }
                        } else {
                            message.warning('该用户下的服务器已存在,请检查');
                            return;
                        }
                    }
                }
                if (serverId !== null) {
                    this.props.dispatch({
                        type: 'theServer/edit',
                        payload: {
                            serverId: serverId,
                            ip: values.ip,
                            ssh_user: values.ssh_user,
                            port: values.port,
                            password: values.password,
                            remarks: values.remarks,
                            callback: () => {
                                this.setState({
                                    modalVisible: false
                                });
                            },
                        }
                    });
                } else {
                    this.props.dispatch({
                        type: 'theServer/add',
                        payload: {
                            serverId: null,
                            ip: values.ip,
                            ssh_user: values.ssh_user,
                            port: values.port,
                            password: values.password,
                            remarks: values.remarks,
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
    // 删除
    delTheServer = (id) => {
        this.props.dispatch({
            type: 'theServer/del',
            payload: {
                id,
            }
        });
    }
    // 编辑
    theServerEdit = (id, ip, ssh_user, remarks, port, password) => {
        let props = this.props;
        props.form.resetFields();
        this.setState({
            modalVisible: true,
            serverId: id,
            ip: ip,
            ssh_user: ssh_user,
            remarks: remarks,
            port: port,
            password: password
        });
    }
    detailsServerOk = () => {
        this.setState({
            detailsModel: false,
        })
    }
    // 取消
    detailsServerCancel = () => {
        this.setState({
            detailsModel: false
        });
    }
    //资源详情
    detailServer = (id) => {
        this.setState({
            detailsModel: true
        });
        this.props.dispatch({
            type: 'theServer/detailServer',
            payload: {
                serverId: id,
            }
        });
    }
    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不匹配!');
        } else {
            callback();
        }
    }
    pageChangeHandler = (pagination) => {
        let page = pagination.current;
        this.props.dispatch(routerRedux.replace({
            pathname: '/system/serverList',
            query: { page }
        }));
    }
    render() {

        const columns = [
            {
                title: 'ip地址',
                dataIndex: 'ip',
                key: 'ip',
                render: (text, record) => <a onClick={() => { this.detailServer(record.id) }}>{record.ip}</a>
            },
            {
                title: 'ssh用户',
                dataIndex: 'ssh_user',
                key: 'ssh_user',
            },
            {
                title: '端口号',
                dataIndex: 'port',
                key: 'port',
            },
            {
                title: 'MySql实例个数',
                dataIndex: 'instance_number',
                key: 'instance_number',
            },
            {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks',
            },
            {
                title: '操作',
                width: 100,
                render: (text, record) => (
                    <div>
                        <a onClick={() => { this.theServerEdit(record.id, record.ip, record.ssh_user, record.remarks, record.port, record.password) }}>修改</a>
                        <Popconfirm title="确认删除?" onConfirm={() => { this.delTheServer(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];

        const props = this.props;
        let { list, serverId, ip, instanceNumber, ssh_user, remarks, port, total, page: current } = props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        var url = "/system/serverList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="添加服务器"
                    onOk={this.theServerOk}
                    confirmLoading={props.loading}
                    onCancel={this.theServerCancel}>
                    <Form layout="horizontal">
                        <FormItem label="服务器IP" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('ip', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.ip || null
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="ssh用户" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('ssh_user', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.ssh_user || "root"
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="端口号" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('port', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.port || "22"
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="服务器密码" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true, message: '请输入密码！'
                                    },
                                ],
                                initialValue: this.state.password || null
                            })(<Input type="password" />)}
                        </FormItem>
                        <FormItem label="确认密码" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请确认密码！',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                                initialValue: this.state.password || null
                            })(
                                <Input
                                    type="password"
                                />
                            )}
                        </FormItem>
                        <FormItem label="备注" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('remarks', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.remarks || null
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.detailsModel}
                    title="服务器详情"
                    confirmLoading={props.loading}
                    onCancel={this.detailsServerCancel}
                    footer={[
                        <Button key="back" type="primary" onClick={this.detailsServerCancel}>返回</Button>,
                    ]}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">服务器IP: {ip}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">ssh用户: {ssh_user}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">端口号: {port}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">实例个数: {instanceNumber}</div>
                        </Col>
                    </Row>
                </Modal>
                <div className="clearfix">
                    <Button onClick={this.theServerAdd} className="pull-right" type="primary" icon="plus">新增</Button>
                </div>
                <div className="box20" />
                <Table
                    columns={columns}
                    dataSource={list}
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
    const { list, serverId, ip, instanceNumber, ssh_user, remarks, port, total, page } = state.theServer;
    return {
        loading: state.loading.models.theServer,
        list,
        serverId,
        ip,
        instanceNumber,
        ssh_user,
        remarks,
        port,
        total,
        page
    };
}

TheServer = Form.create()(TheServer);
export default connect(mapStateToProps)(TheServer);