/**
 * 集中管理路由，所有的接口地址
 *   1. 整个应用用到了哪些接口一目了然
 *   2. 接口地址可能变化，方便管理
 */
//api地址前缀
const prefix = '';
export default(config => {
    return Object.keys(config).reduce((copy,name) => {
        copy[name] = `${prefix}${config[name]}`;
        return copy;
    },{})
})({
    //所有api接口
    "getExampleData":"/api/example/data",
    "getUser":"/yyyy/user/data",
})
