import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const MainLayout = dynamic({
    app,
    component: () => import('./components/MainLayout')
  });
  const userList = dynamic({
    app,
    component: () => import('./components/system/UserList'),
  })
  const adminList = dynamic({
    app,
    component: () => import('./components/system/AdminList'),
  })
  const orderList = dynamic({
    app,
    component: () => import('./components/system/OrderList'),
  })
  const roomList = dynamic({
    app,
    component: () => import('./components/system/RoomList'),
  })
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={MainLayout} />
        {/* 下面酒店管理系统的前端路由配置*/}
        <Route path="/system/userList" exact component={userList}/>
        <Route path="/system/adminList" exact component={adminList}/>
        <Route path="/system/orderList" exact component={orderList}/>
        <Route path="/system/roomList" exact component={roomList}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;

