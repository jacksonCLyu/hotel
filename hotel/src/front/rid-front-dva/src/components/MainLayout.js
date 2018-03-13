import React from 'react';
import { Layout, Menu, Icon, Modal, Tooltip } from 'antd';
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
class MainLayout extends React.Component {
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
    render() {
        const props = this.props;
        const { SubMenu } = Menu;
        const { Header, Content, Sider } = Layout;
        let { children, location, sider = "system", highlighted = "1,sub1,1", url = " ", userMenu } = props;
        var urlToArr
        if (url) {
            urlToArr = url.split('/');
        }
        urlToArr[2] = "/"+urlToArr[1] + "/" + urlToArr[2]
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
                    <a onClick={this.logout} className={styles.out}>退出</a>
                </Header>
                <Layout>
                    <Sider width={210} style={{ background: '#fff', overflowY: 'auto', overflowX: 'hidden' }} >
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
    const {   userMenu } = state.userDetail;
    return {
        loading: state.loading.models.userDetail,
       
        userMenu
    };
}
export default connect(mapStateToProps)(MainLayout);
