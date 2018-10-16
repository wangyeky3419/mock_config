//axios的二次封装
import axios from 'axios';

//设置请求的公共url
// axios.defauls.baseURL = 'public/test';
let url = 'public/'
// 配置允许跨域携带cookie
// axios.defaults.withCredentials = true;

//设置超时时间
// axios.defaults.timeout = 10000;

//标识这是一个ajax请求
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//axios拦截器
axios.interceptors.request.use(config => {
        // let token = localStorage.getItem("x-auth-token");
        //设置token   每次请求都会携带令牌
        let token = '10086'
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.token = `${token}`;
            console.log('config',config)
        }
        if (config.url.indexOf(url) === -1) {
            config.url = url + config.url;/*拼接完整请求路径*/
            console.log('config2',config)
        }
        return config;
    // err => {
    //     return Promise.reject(err);
    // };
})

//配置相应拦截   axios拦截器
axios.interceptors.response.use(response => {
    // 在这里你可以判断后台返回数据携带的请求码
    if (response.data.retcode === 200 || response.data.retcode === '200') {
        return response.data.data || response.data
    }else {
        // 非200请求抱错
        throw Error(response.data.msg || '服务异常')
    }
})
export default axios
