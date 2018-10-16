import http from '../utils/http';
import apis from '../utils/apis';

//从外部接收参数，没有参数默认为空对象
export function getExampleData(params = {names:'王野'}){
    //return 对应的get,post方法，第一个填路径，第二个给参数对象
    return http.get(apis.getExampleData,{names:'王野'})
}

export function getUser213(params = {}){
    //return 对应的get,post方法，第一个填路径，第二个给参数对象
    console.log('getUser333',params)
    return http.post(apis.getUser,params)
}

//把获取exampleData这个接口封装成了一个方法
//在所需的页面调用对应的方法就好了