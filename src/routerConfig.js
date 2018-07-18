// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import BlankLayout from './layouts/BlankLayout';
import Dashboard from './pages/Dashboard';

import BasicSetting from './pages/BasicSetting';
import NavigationSetting from './pages/NavigationSetting';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

import ExecutiveMachine from './pages/ExecutiveMachine';//执行机
import MockEnvironment from './pages/MockEnvironment';//环境管理
import MockSystem from './pages/MockSystem';//仿真系统管理

const routerConfig = [
  {
    path: '/login',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: '/',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Dashboard,
  },
  {
    path: '/setting',
    layout: HeaderAsideFooterResponsiveLayout,
    component: BasicSetting,
    children: [
      {
        path: '/basic',
        layout: HeaderAsideFooterResponsiveLayout,
        component: BasicSetting,
      },
      {
        path: '/navigation',
        layout: HeaderAsideFooterResponsiveLayout,
        component: NavigationSetting,
      },
    ],
  },
  
  {
    path: '/cate',
    layout: HeaderAsideFooterResponsiveLayout,
    component: ExecutiveMachine,
    children: [
      {
        path: 'executiveMachine',
        layout: HeaderAsideFooterResponsiveLayout,
        component: ExecutiveMachine,
      },
      {
        path: 'mockEnvironment',
        layout: HeaderAsideFooterResponsiveLayout,
        component: MockEnvironment,
      },
      {
        path: 'mockSystem',
        layout: HeaderAsideFooterResponsiveLayout,
        component: MockSystem,
      },
    ],
  },
  {
    path: '*',
    layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;
