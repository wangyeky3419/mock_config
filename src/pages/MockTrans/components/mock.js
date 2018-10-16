// 创建表格头
export function columns(){
    return [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: 60,
            render:(value, index, record) => {
                return index+1
            }
        },
        {
            title: '交易代码',
            dataIndex: 'transCode',
            key: 'transCode',
            width: 150,
        },
        {
            title: '交易名称',
            dataIndex: 'transName',
            key: 'transName',
            width: 150,
        },
        {
            title: '所属系统',
            width: 150,
            dataIndex: 'systemName',
            key: 'systemName',
        },
        {
            title: '仿真类型',
            width: 150,
            dataIndex: 'mockType',
            key: 'mockType',
            render:(value,index,record)=>{
                if(value=='VC'){
                    return '仿客户端'
                }else if(value='VS'){
                    return '仿服务端'
                }else{
                    return value
                }
            }
        }
    ]
}
// 创建搜索list
export function filter(){
    return [
        {label:'交易代码', value:'transCode',key:'transCode'},
        {label:'交易名称', value:'transName',key:'transName'},
        {label:'所属系统', value:'systemName',key:'systemName'},
    ]
}
// 创建弹框
export function getFields(data){
    return [
        {
            name:'交易代码',
            key:'transCode',
            type:'input',
            required:true,
        },
        {
            name:'交易名称',
            key:'transName',
            required:true,
            type:'input'
        },
        {
            name:'所属系统',
            key:'systemId',
            type:'select',
            required:true,
            selectData : data
        }
    ]
}