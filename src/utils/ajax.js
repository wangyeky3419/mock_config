
import axios from 'axios'
//获取表格数据
export function getTableData(url,params){
    return axios({
        method:'post',
        url:url,
        // withCredentials:true,
        data:{param:{content:params}}
    })
}
//新增
export function addTable(url,params){
    return axios({
        method:'post',
        url:url,
        // withCredentials:true,
        data:{content:params}
    })
}
//修改
export function editTable(url,params){
    return axios({
        method:'post',
        url:url,
        // withCredentials:true,
        data:{content:params}
    })
}
//删除
export function delTable(url,params){
    return axios({
        method:'post',
        url:url,
        contentType: 'application/json',
        // withCredentials:true,
        data:{content:[params]}
    })
}
//删除2
export function delTable2(url,params){
    return axios({
        method:'post',
        url:url,
        contentType: 'application/json',
        // withCredentials:true,
        params:{param:{content:params}}
    })
}
//获取树节点，懒加载
export function getTree(url,params){
    return axios({
        method:'post',
        url:url,
        // withCredentials:true,
        data:{content:params}
    })
}