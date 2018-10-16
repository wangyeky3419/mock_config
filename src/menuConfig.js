// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    to: '/home',
    icon: 'home',
  },
  {
    name: '反馈',
    external: true,
    newWindow: true,
    icon: 'message',
    to:'www.baidu.com'
  },
  {
    name: '帮助',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
    to:'www.baidu.com'
  },
];

const asideMenuConfig = [
  {
    name: '首页',
    path: '/home',
    icon: 'home',
  },
  {
    name: '分类',
    path: '/cate',
    icon: 'cascades',
    children: [
      { name: '执行机管理', path: '/cate/executiveMachine',
      authority: 'admin', },
      { name: '仿真系统管理', path: '/cate/mockSystem' },
      { name: '仿真交易管理', path: '/cate/mockTrans' },
      { name: '环境名称管理', path: '/cate/envName' },
      { name: '环境管理', path: '/cate/mockEnvironment' },
      { name: '环境参数管理', path: '/cate/envParams' },
      { name: '报文模板配置', path: '/cate/template' },
      { name: '系统部署管理', path: '/cate/systemManage' },
      { name: '报文测试', path: '/cate/singleCase' },
      { name: '日志查询', path: '/cate/showLog' },
      { name: '规则管理', path: '/cate/mappingRule' },
      { name: '快速收发报文', path: '/cate/singleCaseFast' },
      { name: '仿服务端场景管理', path: '/cate/sceneManagement' },
      { name: '数据字典', path: '/cate/dictionaries' },
      { name: '测试', path: '/cate/test' },
    ],
  }
];

export { headerMenuConfig, asideMenuConfig };
