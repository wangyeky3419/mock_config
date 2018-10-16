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
            title: '环境名称',
            dataIndex: 'envName',
            key: 'envName',
            width: 150,
        },
        {
            title: '环境编码',
            dataIndex: 'envCode',
            key: 'envCode',
            width: 150,
        },
        {
            title: '会计日期',
            width: 150,
            dataIndex: 'accountingDate',
            key: 'accountingDate'
        },
        {
            title: '是否启用',
            width: 150,
            dataIndex: 'enable',
            key: 'enable',
            render:(value,index,record)=>{
                if(record.enable=='0'){
                    return '启用'
                }else if(record.enable=='1'){
                    return '禁用'
                }else {
                    return record.enable
                }
            }
        }
    ];
}
export function getFields(){
    return [
        {
            name:'环境名称',
            key:'envName',
            type:'input',
            required:true,
        },
        {
            name:'环境编码',
            key:'envCode',
            required:true,
            type:'input'
        },
        {
            name:'会计日期',
            key:'accountingDate',
            type:'datepicker',
            required:true
        },
        {
            name:'是否启用',
            key:'enable',
            type:'select',
            required:true,
            selectData : [
                {label:'启用', value:'0', key:'0'},
                {label:'禁用', value:'1', key:'1'}
            ]
        }
    ]
}
export function filter(){
    return [
        {label:'环境编码', value:'envCode',key:'envCode'},
        {label:'环境名称', value:'envName',key:'envName'},
    ]
}