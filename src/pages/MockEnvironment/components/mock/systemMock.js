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
            title: '系统编码',
            dataIndex: 'systemCode',
            key: 'systemCode',
        },
        {
            title: '系统名称',
            dataIndex: 'systemName',
            key: 'systemName',
        },
        {
            title: '版本号',
            dataIndex: 'systemVersion',
            key: 'systemVersion',
        },
        {
            title: '仿真类型',
            dataIndex: 'mockType',
            key: 'mockType',
            render:(value,index,record)=>{
                if(record.mockType == 'VC'){
                    return '仿客户端'
                }else if(record.mockType == 'VS'){
                    return '仿服务端'
                }else{
                    return record.mockType
                }
            }
        },
        {
            title: '执行机名称',
            dataIndex: 'executorName',
            key: 'executorName',
        },
        {
            title: '运行状态',
            dataIndex: 'runStatus',
            key: 'runStatus',
            render:(value,index,record)=>{
                if(record.runStatus == '0'){
                    return '停止'
                }else if(record.runStatus == '1'){
                    return '运行'
                }else{
                    return record.runStatus
                }
            }
        },
        {
            title: '发布状态',
            dataIndex: 'pubStatus',
            key: 'pubStatus',
            render:(value,index,record)=>{
                if(record.pubStatus == '0'){
                    return '未发布'
                }else if(record.pubStatus == '1'){
                    return '已发布'
                }else{
                    return record.pubStatus
                }
            }
        },
        {
            title: '发布时间',
            dataIndex: 'pubTime',
            key: 'pubTime',
        },
        {
            title: '环境参数',
            width:'50%',
            dataIndex: 'paras',
            key: 'paras',
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