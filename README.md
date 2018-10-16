# ice-scaffold-cms

@auther wangye 
所需技术:
* react        http://react.css88.com/docs/getting-started.html
* ice-design   https://alibaba.github.io/ice/component/pagination
* es6          http://caibaojian.com/es6/
开发工具:
* iceworks 用于项目启动，构建，代理转发配置，依赖包安装
* vscode

> 使用文档

使用:

* 启动调试服务: `npm start`
* 构建 dist: `npm run build`

目录结构:
* react-router @4.x 默认采用 hashHistory 的单页应用
* 入口文件: `src/index.js`
* 导航配置: `src/menuConfig.js`
* 路由配置: `src/routerConfig.js`
* 路由入口: `src/router.jsx`
* 布局文件: `src/layouts`
* 通用组件: `src/components`   
* 页面文件: `src/pages`
* 本地数据: `mock-config`
* 配置文件: `package.json`
* 常用请求接口封装: `src/utils/ajax.js`
* 通用函数: `src/utils/commonFn.js`
* 接口管理封装: `src/utils/apis.js`
* axios二次封装: `src/utils/http.js`
* 请求函数封装: `src/service/index.js`

组件信息:
* components 文件夹，包含该组件的一些表格等公共组件
    + .jsx文件名中以Table结尾的表示为table表格
    + index.js 为组件入口文件
    + mock.js或..Mock.js 为组件内公共的标头、弹框、搜索内容信息，如果mock数据为1条以上时，会放在mock文件夹中
* utils/apis.js 对请求接口进行统一管理，如果有借口需要改动，则直接在这里面进行修改即可
* utils/http.js 对axios请求方法进行了二次封装，如超时时间、是否携带cookie、身份令牌、代理等
* utils/service/index.js 引用上述两个文件，对接口地址进行封装，返回一个方法，页面请求出直接调用这个方法即可

说明:
* 通用组件里面封装了   
    + 表格组件
    + 新增弹框组件
    + 修改弹框组件
    + 树组件
    + 搜索组件
    + 表格组件
    + 面包屑
    + 页面布局的Header、Footer
效果图:

![screenshot](https://img.alicdn.com/tfs/TB1ai53mqmWBuNjy1XaXXXCbXXa-1920-1080.png)
