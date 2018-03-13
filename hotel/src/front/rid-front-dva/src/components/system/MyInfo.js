import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Modal, Select, Row, Col } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import Moment from 'moment'
const FormItem = Form.Item;
class MyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsModel: false
        };
    }
    exit = () => {
        let { userInfo } = this.props
        this.setState({
            detailsModel: true,
            id: userInfo.id,
            userAccount: userInfo.userAccount,
            userPassword: userInfo.userPassword,
            userName: userInfo.userName,
            userId: userInfo.userId,
            userAge: userInfo.userAge,
            userPhone: userInfo.userPhone
        });
    }
    cancel = () => {
        this.setState({
            detailsModel: false
        })
    }
    ok = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'myInfo/edit',
                    payload: {
                        id: this.state.id,
                        userPassword:null,
                        userName: values.userName,
                        userId: values.userId,
                        userAge: values.userAge,
                        userPhone: values.userPhone,
                        callback: () => {
                            this.setState({
                                detailsModel: false
                            });
                        },
                    }
                });
            }
        });
    }
    render() {
        const props = this.props;
        let { userInfo } = props;
        var url = "/system/myInfo"
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.detailsModel}
                    title="修改信息"
                    confirmLoading={props.loading}
                    onOk={this.ok}
                    onCancel={this.cancel}>
                    <Form layout="horizontal">
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
                        <FormItem label="身份证号" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('userId', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.userId || null
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="用户年龄" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('userAge', {
                                initialValue: this.state.userAge || null
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="用户手机" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('userPhone', {
                                initialValue: this.state.userPhone || null
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
                <div className="clearfix">
                    <Button className="pull-right" type="primary" onClick={this.exit} >修改</Button>
                </div>
                <br />
                <div  >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">账号: {userInfo.userAccount}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">用户姓名: {userInfo.userName}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">身份证号: {userInfo.userId}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} >
                        <Col className="gutter-row" >
                            <div className="gutter-box"> 年龄: {userInfo.userAge}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">手机号: {userInfo.userPhone}</div>
                        </Col>
                    </Row>
                </div>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { userInfo } = state.myInfo;
    return {
        loading: state.loading.models.myInfo,
        userInfo
    };
}
MyInfo = Form.create()(MyInfo);
export default connect(mapStateToProps)(MyInfo);