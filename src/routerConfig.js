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
import Home from './pages/Home';

import ExecutiveMachine from './pages/ExecutiveMachine'; //执行机
import MockEnvironment from './pages/MockEnvironment'; //环境管理
import MockSystem from './pages/MockSystem'; //仿真系统管理
import SingleCase from './pages/SingleCase'; //报文测试
import MockTrans from './pages/MockTrans'; //仿真交易管理
import EnvName from './pages/EnvName'; //环境名称管理
import Template from './pages/Template'; //环境名称管理
import SystemManage from './pages/SystemManage'; //系统部署管理
import ShowLog from './pages/ShowLog'; //日志查询
import MappingRule from './pages/MappingRule'; //规则管理
import SingleCaseFast from './pages/SingleCaseFast'; //快速收发报文
import EnvParams from './pages/EnvParams'; //环境参数管理
import SceneManagement from './pages/SceneManagement'; //仿服务端场景管理
import Dictionaries from './pages/Dictionaries'; //仿服务端场景管理
import test from './pages/Test/test'; //测试树懒加载

const routerConfig = [
  {
    path: '/login',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: '/',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: '/home',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Home,
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
      {
        path: 'mockTrans',
        layout: HeaderAsideFooterResponsiveLayout,
        component: MockTrans,
      },
      {
        path: 'envName',
        layout: HeaderAsideFooterResponsiveLayout,
        component: EnvName,
      },
      {
        path: 'template',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Template,
      },
      {
        path: 'systemManage',
        layout: HeaderAsideFooterResponsiveLayout,
        component: SystemManage,
      },
      {
        path: 'singleCase',
        layout: HeaderAsideFooterResponsiveLayout,
        component: SingleCase,
      },
      {
        path: 'showLog',
        layout: HeaderAsideFooterResponsiveLayout,
        component: ShowLog,
      },
      {
        path: 'mappingRule',
        layout: HeaderAsideFooterResponsiveLayout,
        component: MappingRule,
      },
      {
        path: 'singleCaseFast',
        layout: HeaderAsideFooterResponsiveLayout,
        component: SingleCaseFast,
      },
      {
        path: 'envParams',
        layout: HeaderAsideFooterResponsiveLayout,
        component: EnvParams,
      },
      {
        path: 'sceneManagement',
        layout: HeaderAsideFooterResponsiveLayout,
        component: SceneManagement,
      },
      {
        path: 'dictionaries',
        layout: HeaderAsideFooterResponsiveLayout,
        component: Dictionaries,
      },
      {
        path: 'test',
        layout: HeaderAsideFooterResponsiveLayout,
        component: test,
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
