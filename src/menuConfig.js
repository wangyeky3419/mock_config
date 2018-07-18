// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'home',
  },
  {
    name: '分类',
    path: '/cate',
    icon: 'cascades',
    children: [
      { name: '执行机管理', path: '/cate/executiveMachine' },
      { name: '环境管理', path: '/cate/mockEnvironment' },
      { name: '仿真系统管理', path: '/cate/mockSystem' },
    ],
  }
];

export { headerMenuConfig, asideMenuConfig };
