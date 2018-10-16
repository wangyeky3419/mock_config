export function columns(){
    return [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render:(value,index,record) => {
                return index+1
            }
        },
        {
            title: '交易码',
            dataIndex: 'transCode',
            key: 'transCode',
        },
        {
            title: '交易名称',
            dataIndex: 'transName',
            key: 'transName',
        },
        {
            title: '所属系统',
            dataIndex: 'systemName',
            key: 'systemName',
        },
        {
            title: '版本号',
            dataIndex: 'transTemplateVersion',
            key: 'transTemplateVersion',
        },
        {
            title: '状态标识',
            dataIndex: 'serviceStatus',
            key: 'serviceStatus',
            render:(value,index,record)=>{
                if(record.serviceStatus == '0'){
                    return '禁用'
                }else if(record.serviceStatus == '1'){
                    return '可用'
                }else{
                    return record.serviceStatus
                }
            }
        }
    ];
}
export function filter(){
    return [
        {label:'系统编码', value:'systemName',key:'systemName'},
        {label:'系统名称', value:'systemCode',key:'systemCode'},
        {
            label:'运行状态', 
            value:'runStatus',
            key:'runStatus',
            option:[
                {
                    label:'运行',
                    value:'1'
                },
                {
                    label:'停止',
                    value:'0'
                }
            ]
        },
        {
            label:'发布状态', 
            value:'pubStatus',
            key:'pubStatus',
            option:[
                {
                    label:'已发布',
                    value:'1'
                },
                {
                    label:'未发布',
                    value:'0'
                }
            ]
        }
    ]
}