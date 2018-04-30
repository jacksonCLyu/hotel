import React from 'react';
import { Layout, Menu, Icon, Modal, Tooltip, Dropdown, Form, Input } from 'antd';
import { Link, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import styles from './MainLayout.css';
import { connect } from 'dva';
import "babel-polyfill";

//以下是新系统
import { UserList } from './system/UserList';
import { AdminList } from './system/AdminList';
import { OrderList } from './system/OrderList';
import { RoomList } from './system/RoomList';
import { MyInfo } from './system/MyInfo';
import { MyOrder } from './system/MyOrder';
import { MyRoom } from './system/MyRoom';
import { Evaluation } from './system/Evaluation';
import { Complaints } from './system/Complaints';

import { OtherOrders } from './system/OtherOrders';

import { CasualDiet } from './system/CasualDiet';
const FormItem = Form.Item;
class MainLayout extends React.Component {
    state = {
        modalVisible: false
    }
    // 退出
    logout = () => {
        sessionStorage.removeItem('userResource');
        sessionStorage.removeItem('userRedisResource');
        sessionStorage.removeItem('userMenu')
        window.location = '/loginOut'
    }
    isMenu = (menu) => {
        if (menu == undefined || menu == null || menu.length == 0) {
            return false
        } else {
            return true
        }
    }
    exitPassword = () => {
        this.props.form.resetFields();
        const user = JSON.parse(sessionStorage.getItem('user'));
        const id = user.id;
        const oldPassword = user.userPassword;
        this.setState({
            modalVisible: true, id, oldPassword
        })
    }
    cancel = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: false, id: null, oldPassword: null
        })
    }
    //新旧密码比对
    newAndOld = (rule, value, callback) => {
        const { form } = this.props;
        console.log(this.state.oldPassword)
        if (value && value !== this.state.oldPassword) {
            callback('原密码不正确请确认!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('userPassword')) {
            callback('两次输入的密码不匹配!');
        } else {
            callback();
        }
    }
    ok = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let id = this.state.id;
                this.props.dispatch({
                    type: 'userDetail/editPassword',
                    payload: {
                        id: id,
                        userPassword: values.userPassword,
                        callback: () => {
                            Modal.success({
                                content: "修改成功,请重新登入",
                                onOk: () => {
                                    sessionStorage.removeItem('userResource');
                                    sessionStorage.removeItem('userRedisResource');
                                    sessionStorage.removeItem('userMenu')
                                    window.location = '/loginOut'
                                }
                            });
                        },
                    }
                });
            }
        });
    }
    render() {
        const props = this.props;
        const { SubMenu } = Menu;
        const { Header, Content, Sider } = Layout;
        let { children, location, sider = "system", highlighted = "1,sub1,1", url = " ", userMenu } = props;
        var urlToArr
        if (url) {
            urlToArr = url.split('/');
        }
        urlToArr[2] = "/" + urlToArr[1] + "/" + urlToArr[2]
        const highlightedToArr = highlighted.split(',');
        var resurce;
        var redisResource;
        var menu;
        if (sessionStorage.length == 0) {
            props.dispatch({
                type: 'userDetail/listInit',
            });
        }
        if (sessionStorage.getItem('userMenu') != "undefined") {
            menu = JSON.parse(sessionStorage.getItem('userMenu'));
        }
        if (menu == "undefined") {
            userMenu = [];
        } else {
            userMenu = menu
        }
        let explorer = window.navigator.userAgent.toLowerCase();
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userName = user.userName;
        const menuDropdown = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.exitPassword}><Icon type="edit" />&nbsp;修改密码</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.logout}><Icon type="poweroff" />&nbsp;退出</a>
                </Menu.Item>
            </Menu>
        );
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        return (
            <Layout>
                <Header className={`header ${styles.header}`}>
                    <div className={styles.logo}></div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[highlightedToArr[0]]}
                        style={{ lineHeight: '64px', fontSize: 16 }}
                    >
                    </Menu>
                    <Dropdown overlay={menuDropdown}>
                        <a className={styles.out}>
                            <Icon type="user" />:&nbsp;{userName}
                        </a>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider width={210} style={{ background: '#fff', overflowY: 'auto', overflowX: 'hidden' }} >
                        <Modal
                            visible={this.state.modalVisible}
                            title="修改密码"
                            confirmLoading={props.loading}
                            onOk={this.ok}
                            onCancel={this.cancel}>
                            <Form layout="horizontal">
                                <FormItem label="原密码" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('oldPassword', {
                                        rules: [{
                                            required: true, message: '请输入原密码!',
                                        }, {
                                            validator: this.newAndOld,
                                        }],
                                    })(<Input type="password" />)}
                                </FormItem>
                                <FormItem label="新密码" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('userPassword', {
                                        rules: [
                                            {
                                                required: true,
                                            },
                                        ],
                                    })(<Input type="password" />)}
                                </FormItem>
                                <FormItem label="确认密码" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('confirm', {
                                        rules: [{
                                            required: true, message: '请确认密码！',
                                        }, {
                                            validator: this.checkConfirm,
                                        }],
                                    })(<Input type="password" />)}
                                </FormItem>
                            </Form>
                        </Modal>
                        <Menu
                            mode="inline"
                            defaultOpenKeys={[urlToArr[1]]}
                            selectedKeys={[urlToArr[2]]}
                            style={{ height: '100%', borderRight: 0 }}>
                            {
                                this.isMenu(userMenu) ?
                                    userMenu.map((data, index) => {
                                        return <Menu.Item key={data.menuUrl}>
                                            <Link to={data.menuUrl}>{data.menuName}</Link>
                                        </Menu.Item>

                                    }) : null
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content className={styles.content}>
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    const { userMenu } = state.userDetail;
    return {
        loading: state.loading.models.userDetail,

        userMenu
    };
}
MainLayout = Form.create()(MainLayout);
export default connect(mapStateToProps)(MainLayout);
