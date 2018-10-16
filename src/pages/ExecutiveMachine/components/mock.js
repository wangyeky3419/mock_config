//表格信息
export function columns(){
    return [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 60,
                render: (value, index, record) => {
                    return index+1
                },
            },
            {
                title: '执行机名称',
                dataIndex: 'executorName',
                key: 'executorName',
                width: 150,
            },
            {
                title: '执行机IP',
                dataIndex: 'executorIp',
                key: 'executorIp',
                width: 150,
            },
            {
                title: '执行机PORT',
                width: 150,
                dataIndex: 'executorPort',
                key: 'executorPort',
            },
            {
                title: '配置中心IP',
                width: 150,
                dataIndex: 'centralIp',
                key: 'centralIp',
            },
            {
                title: '配置中心PORT',
                width: 150,
                dataIndex: 'centralPort',
                key: 'centralPort',
            },
            {
                title: '状态',
                width: 150,
                dataIndex: 'status',
                key: 'status',
                render:(value,index,record)=>{
                    if(record.status=='0'){
                        return '已停止';
                    }else if(record.status=='1'){
                        return '已启动'
                    }else{
                        return record.status
                    }
                }
            },
            {
                title: '心跳开关',
                width: 150,
                dataIndex: 'heartBeatFlag',
                key: 'heartBeatFlag',
                render:(value,index,record)=>{
                    if(record.heartBeatFlag=='0'){
                        return '关闭';
                    }else if(record.heartBeatFlag=='1'){
                        return '开启'
                    }else{
                        return record.status
                    }
                }
            },
            {
                title: '心跳频率',
                width: 150,
                dataIndex: 'heartBeatStep',
                key: 'heartBeatStep',
                render:(value,index,record)=>{
                    return record.heartBeatStep+'秒';
                }
            },
            {
                title: '最后心跳时间',
                width: 150,
                dataIndex: 'lastTime',
                key: 'lastTime',
            }
    ]
}
//搜索信息
export function filter(){
    return [
        {label:'执行机名称', value:'executorName',key:'executorName'},
        {label:'执行机IP', value:'executorIp',key:'executorIp'},
        {label:'执行机PORT', value:'executorPort',key:'executorPort'},
        {label:'配置中心IP', value:'centralIp',key:'centralIp'},
        {label:'配置中心PORT', value:'centralPort',key:'centralPort'}
    ]
}
 //新增/修改弹框
export function getFields(){
    return [
            {
                name:'姓名',
                key:'name',
                type:'input'
            },
            {
                name:'编码',
                key:'shortName',
                required:true,
                type:'input'
            },
            {
                name:'称呼',
                key:'call',
                disabled:true,
                type:'input'
            },
            {
                name:'年龄',
                key:'age',
                type:'select',
                selectData : [
                    {label:'option1', value:'option1',key:1},
                    {label:'option2', value:'option2',key:2},
                ]
            },
            {
                name:'备注',
                key:'msg',
                type:'textarea',
                disabled:true,
            },
            {
                name:'日期',
                key:'date',
                type:'datepicker'
            }
        ]
    
}