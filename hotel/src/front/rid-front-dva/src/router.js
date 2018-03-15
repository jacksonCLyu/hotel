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
  const myInfo = dynamic({
    app,
    component: () => import('./components/system/MyInfo'),
  })
  const myOrder = dynamic({
    app,
    component: () => import('./components/system/MyOrder'),
  })
  const myRoom = dynamic({
    app,
    component: () => import('./components/system/MyRoom'),
  })
  const evaluation = dynamic({
    app,
    component: () => import('./components/system/Evaluation'),
  })
  const complaints = dynamic({
    app,
    component: () => import('./components/system/Complaints'),
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
        <Route path="/system/myInfo" exact component={myInfo}/>
        <Route path="/system/myOrder" exact component={myOrder}/>
        <Route path="/system/myRoom" exact component={myRoom}/>
        <Route path="/system/evaluationList" exact component={evaluation}/>
        <Route path="/system/complaintsList" exact component={complaints}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;

