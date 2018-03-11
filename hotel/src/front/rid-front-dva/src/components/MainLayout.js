import React from 'react';
import { Layout, Menu, Icon, Modal, Tooltip } from 'antd';
import { Link, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import styles from './MainLayout.css';
import { connect } from 'dva';

import { MySqlExample } from './system/MySqlExample';
import { TheServer } from './system/TheServer';
import { FlowTemplate } from './system/FlowTemplate';
import { TaskFlow } from './system/TaskFlow';
import { addFlowTemplate } from './system/taskFlow/AddFlowTemplate';
import { addFlow } from './system/taskFlow/AddFlow';
import { PublicAllocation } from './system/PublicAllocation';
import { DbResource } from './system/DbResource';
import { UserManagement } from './system/UserManagement';
import { LogManagement } from './system/LogManagement';
import { RoleManagement } from './system/RoleManagement';
import { RedisManagement } from './system/RedisManagement';
import { SqlDBAExamine } from './sqlExamine/SqlDBAExamine';
import { SqlDEVPExamine } from './sqlExamine/SqlDEVPExamine';
import { ExampleLog } from './system/example/ExampleLog';
import { Db } from './system/resource/Db';
import { UserEdit } from './system/user/UserEdit';
import { GrantRelation } from './system/user/GrantRelation';
import { RoleSee } from './system/role/RoleSee';
import { Redis } from './system/resource/Redis';
import { DbStatus } from './dbStatus/DbStatus';
import { ExecuteSQL } from './executeSQL/ExecuteSQL';
import { OperationLog } from './system/OperationLog';
import { Dbquery } from './dbquery/Dbquery';
import { RedisQuery } from './redisQuery/RedisQuery';
import { SeeInformationDBA } from './sqlExamine/SqlDBA/SeeInformationDBA';
import { SeeInformationDEVP } from './sqlExamine/SqlDEVPE/SeeInformationDEVP';
import "babel-polyfill";

//以下是新系统
import { UserList } from './system/UserList';
class MainLayout extends React.Component {
    // 退出
    logout = () => {
        sessionStorage.removeItem('userResource');
        sessionStorage.removeItem('userRedisResource');
        sessionStorage.removeItem('userMenu')
        window.location = '/loginOut'
    }
    aClick() {
        window.location = "/indexOld";
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
    const { changeLog, userResource, userRedisResource, userMenu } = state.userDetail;
    return {
        loading: state.loading.models.userDetail,
        changeLog,
        userResource,
        userRedisResource,
        userMenu
    };
}
export default connect(mapStateToProps)(MainLayout);
