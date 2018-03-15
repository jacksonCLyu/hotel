import React from 'react';
import { connect } from 'dva';
import { Modal, Table, Button, Input, Popconfirm, Tag, Form, Radio, Col, Row } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import Popover from 'antd/lib/popover';
import { dataDict } from '../../utils/dataDict';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const user = JSON.parse(sessionStorage.getItem('user'));
class Complaints extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            //用来标记,当点击我的评论是置为true
            myflg: false,
            //评论详情
            evaDetails: false,
            //管理员回复
            replyModel: false
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
    cancelDetails = () => {
        this.setState({
            evaDetails: false
        })
    }
    del = (id) => {
        this.props.dispatch({
            type: 'complaints/del',
            payload: {
                id,
            }
        });
    }
    OK = () => {
        this.props.form.validateFields((err, values) => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                let id = this.state.id;
                if (id) {
                    this.props.dispatch({
                        type: 'complaints/updateEvaOrComp',
                        payload: {
                            id: id,
                            content: values.content,
                            score: values.score,
                            callback: () => {
                                this.setState({
                                    modalVisible: false
                                });
                            },
                        }
                    });
                } else {
                    this.props.dispatch({
                        type: 'complaints/inserEvaOrComp',
                        payload: {
                            userId: user.id,
                            content: values.content,
                            score: values.score,
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
    edit = (id, content, score) => {
        let props = this.props;
        props.form.resetFields();
        this.setState({
            modalVisible: true,
            id, content, score
        });
    }
    details = (id, content, score, userName, reply, adminName) => {
        let props = this.props;
        props.form.resetFields();
        this.setState({
            evaDetails: true,
            id, content, score, userName, reply, adminName
        });
    }
    myEva = () => {
        this.setState({
            myflg: true
        })
        this.props.dispatch({
            type: 'complaints/myEva',
            payload: {
                userId: user.id,
            }
        });
    }
    allEva = () => {
        this.setState({
            myflg: false
        })
        this.props.dispatch({
            type: 'complaints/listInit',
        });
    }
    reply = (id, content, score, userName) => {
        let props = this.props;
        props.form.resetFields();
        this.setState({
            replyModel: true,
            id, content, score, userName
        });
    }
    replyCancel = () => {
        let props = this.props;
        props.form.resetFields();
        this.setState({
            replyModel: false,
            id: null, content: null, score: null, userName: null
        });
    }
    text = (text) => {
        let value = text.target.value
        this.setState({
            textValue: value
        })
    }
    replyOk = () => {
        this.props.dispatch({
            type: 'complaints/replyEvaOrComp',
            payload: {
                id: this.state.id,
                adminId: user.id,
                reply: this.state.textValue,
                callback: () => {
                    this.setState({
                        replyModel: false
                    });
                },
            }
        });

    }
    render() {

        const columns = [
            {
                title: '用户',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '投诉内容',
                dataIndex: 'content',
                key: 'content',
            },
            {
                title: '操作',
                width: 150,
                render: (text, record) => (

                    <div>
                        {
                            user.id == record.userId ? <div>
                                <a onClick={() => { this.details(record.id, record.content, record.score, record.userName, record.reply, record.adminName) }}>详情</a>
                                &nbsp;
                                 <a onClick={() => { this.edit(record.id, record.content, record.score) }}>编辑</a>
                                <Popconfirm title="确认删除?" onConfirm={() => { this.del(record.id) }}>
                                    <a style={{ marginLeft: 10 }}>删除</a>
                                </Popconfirm></div> :
                                this.state.myflg ?
                                    <div>
                                        <a onClick={() => { this.details(record.id, record.content, record.score, record.userName, record.reply, record.adminName) }}>详情</a>
                                        &nbsp;
                                <a onClick={() => { this.edit(record.id, record.content, record.record) }}>编辑</a>
                                        <Popconfirm title="确认删除?" onConfirm={() => { this.del(record.id) }}>
                                            <a style={{ marginLeft: 10 }}>删除</a>
                                        </Popconfirm></div> :
                                    user.flg == 1 ? <div>
                                        <a onClick={() => { this.reply(record.id, record.content, record.score, record.userName) }}>回复</a>
                                        &nbsp;
                                    <a onClick={() => { this.details(record.id, record.content, record.score, record.userName, record.reply, record.adminName) }}>详情</a>
                                    </div> : <a onClick={() => { this.details(record.id, record.content, record.score, record.userName, record.reply, record.adminName) }}>详情</a>
                        }

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
        var url = "/system/complaintsList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="添加投诉"
                    onOk={this.OK}
                    confirmLoading={props.loading}
                    onCancel={this.Cancel}>
                    <Form layout="horizontal">
                        <FormItem label="投诉内容" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('content', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.content || null
                            })(<textarea rows={3} style={{ width: 300 }} />)}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.replyModel}
                    title="回复"
                    onOk={this.replyOk}
                    confirmLoading={props.loading}
                    onCancel={this.replyCancel}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">用户: {this.state.userName}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">投诉内容: {this.state.content}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">回复: <textarea rows={3} style={{ width: 300 }} onChange={this.text} /></div>
                        </Col>
                    </Row>

                </Modal >
                <Modal
                    visible={this.state.evaDetails}
                    title="投诉详情"
                    confirmLoading={props.loading}
                    onCancel={this.cancelDetails}
                    footer={[
                        <Button key="back" onClick={this.cancelDetails}>返回</Button>,
                    ]}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">用户: {this.state.userName}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} >
                        <Col className="gutter-row" >
                            <div className="gutter-box"> 投诉内容: {this.state.content}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} >
                        <Col className="gutter-row" >
                            <div className="gutter-box"> 管理员: {this.state.adminName}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} >
                        <Col className="gutter-row" >
                            <div className="gutter-box"> 回复: {this.state.reply}</div>
                        </Col>
                    </Row>
                </Modal>
                <div className="clearfix">
                    {
                        user.flg == 0 ? <div><Button onClick={this.myEva} className="pull-left" >我的投诉</Button>
                            <Button onClick={this.allEva} className="pull-left" >所有投诉</Button>
                        </div> : ""
                    }

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
            </MainLayout >
        )
    }
}

const mapStateToProps = (state) => {
    const { list } = state.complaints;
    return {
        loading: state.loading.models.complaints,
        list,
        // total,
        // page
    };
}
Complaints = Form.create()(Complaints);
export default connect(mapStateToProps)(Complaints);