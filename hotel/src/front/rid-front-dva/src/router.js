import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const MainLayout = dynamic({
    app,
    component: () => import('./components/MainLayout')
  });
  const mySqlExample = dynamic({
    app,
    component: () => import('./components/system/MySqlExample'),
  });
  const theServer = dynamic({
    app,
    component: () => import('./components/system/TheServer'),
  });
  const publicAllocation = dynamic({
    app,
    component: () => import('./components/system/PublicAllocation'),
  });
  const DbResource = dynamic({
    app,
    component: () => import('./components/system/DbResource'),
  });
  const userManagement = dynamic({
    app,
    component: () => import('./components/system/UserManagement'),
  });
  const logManagement = dynamic({
    app,
    component: () => import('./components/system/LogManagement'),
  });
  const roleManagement = dynamic({
    app,
    component: () => import('./components/system/RoleManagement'),
  });
  const redisManagement = dynamic({
    app,
    component: () => import('./components/system/RedisManagement'),
  });
  const sqlDBAExamine = dynamic({
    app,
    component: () => import('./components/sqlExamine/SqlDBAExamine'),
  });
  const sqlDEVPExamine = dynamic({
    app,
    component: () => import('./components/sqlExamine/SqlDEVPExamine'),
  });
  const exampleLog = dynamic({
    app,
    component: () => import('./components/system/example/ExampleLog'),
  });
  const addDB = dynamic({
    app,
    component: () => import('./components/system/resource/Db'),
  });
  const userEdit = dynamic({
    app,
    component: () => import('./components/system/user/UserEdit'),
  });
  const grantRelation = dynamic({
    app,
    component: () => import('./components/system/user/GrantRelation'),
  });
  const roleSee = dynamic({
    app,
    component: () => import('./components/system/role/RoleSee'),
  });
  const dbEdit = dynamic({
    app,
    component: () => import('./components/system/resource/Db'),
  });
  const redisEdit = dynamic({
    app,
    component: () => import('./components/system/resource/Redis'),
  });
  const getDBAExamine = dynamic({
    app,
    component: () => import('./components/sqlExamine/SqlDBA/SeeInformationDBA'),
  });
  const getDEVPExamine = dynamic({
    app,
    component: () => import('./components/sqlExamine/SqlDEVPE/SeeInformationDEVP'),
  });
  const dbStatus = dynamic({
    app,
    component: () => import('./components/dbStatus/DbStatus'),
  });
  const executeSQL = dynamic({
    app,
    component: () => import('./components/executeSQL/ExecuteSQL'),
  });
  const OperationLog = dynamic({
    app,
    component: () => import('./components/system/OperationLog'),
  });
  const Dbquery = dynamic({
    app,
    component: () => import('./components/dbquery/Dbquery'),
  });
  const addFlowTemplate = dynamic({
    app,
    component: () => import('./components/system/taskFlow/AddFlowTemplate')
  })
  const flowTemplate = dynamic({
    app,
    component: () => import('./components/system/FlowTemplate')
  })
  const updateTemplate = dynamic({
    app,
    component: () => import('./components/system/taskFlow/AddFlowTemplate')
  })
  const addFlow = dynamic({
    app,
    component: () => import('./components/system/taskFlow/AddFlow')
  })
  const taskFlow = dynamic({
    app,
    component: () => import('./components/system/TaskFlow')
  })
  const redisQuery = dynamic({
    app,
    component: () => import('./components/redisQuery/RedisQuery'),
  })
  const addRedis = dynamic({
    app,
    component: () => import('./components/system/resource/Redis'),
  })
  const userList = dynamic({
    app,
    component: () => import('./components/system/UserList'),
  })
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={MainLayout} />
        <Route path="/system/exampleLog" exact component={mySqlExample} />
        <Route path="/system/serverList" exact component={theServer} />
        <Route path="/system/confList" exact component={publicAllocation} />
        <Route path="/system/dbResourceList" exact component={DbResource} />
        <Route path="/system/userManagementList" exact component={userManagement} />
        <Route path="/system/logManagementList" exact component={logManagement} />
        <Route path="/system/roleManagementList" exact component={roleManagement} />
        <Route path="/system/redisManagementList" exact component={redisManagement} />
        <Route path="/sqlExamine/sqlDBA" exact component={sqlDBAExamine} />
        <Route path="/sqlExamine/sqlDEVP" exact component={sqlDEVPExamine} />
        <Route path="/system/exampleLog/:id/:page" exact component={exampleLog} />
        <Route path="/system/resource/addDb" exact component={addDB} />
        <Route path="/system/userEdit/:id" exact component={userEdit} />
        <Route path="/system/grantRelation/:id" exact component={grantRelation} />
        <Route path="/system/roleSee/:id" exact component={roleSee} />
        <Route path="/system/dbEdit/:id" exact component={dbEdit} />
        <Route path="/system/redisEdit/:id" exact component={redisEdit} />
        <Route path="/SqlDBA/getDBAExamine/:id" exact component={getDBAExamine} />
        <Route path="/SqlDEVP/getDEVPExamine/:id" exact component={getDEVPExamine} />
        <Route path="/performance/dbStatus/:id" exact component={dbStatus} />
        <Route path="/request/executeSQL/:id" exact component={executeSQL} />
        <Route path="/system/operationLog" exact component={OperationLog} />
        <Route path="/dbquery/queryTables/:id" exact component={Dbquery} />
        <Route path="/system/flowTemplate" exact component={flowTemplate}/>
        <Route path="/system/addflowTemplate" exact component={addFlowTemplate}/>
        <Route path="/system/updateflowTemplate/:id" exact component={updateTemplate}/>
        <Route path="/system/taskFlow" exact component={taskFlow}/>
        <Route path="/redis/redisQuery/:id" exact component={redisQuery}/>
        <Route path="/system/addFlow" exact component={addFlow}/>
        <Route path="/system/updateTaskFlow/:id" exact component={addFlow}/>
        <Route path="/system/restartTaskFlow/:id" exact component={addFlow}/>
        <Route path="/system/resource/addRedis" exact component={addRedis}/>
         <Route path="/system/resource/redisEdit/:id" exact component={addRedis} /> 
        {/* 下面酒店管理系统的前端路由配置*/}
        <Route path="/system/userList" exact component={userList}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;

