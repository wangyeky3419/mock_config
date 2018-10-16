export function columns(){
    return [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: 80,
            render:(value, index, record) => {
                return index+1
            }
        },
        {
            title: '会计日期',
            dataIndex: 'accountingDate',
            key: 'accountingDate',
            width: 150,
        },
        {
            title: '系统编码',
            width: 150,
            dataIndex: 'systemCode',
            key: 'systemCode',
        },
        {
            title: '系统名称',
            width: 150,
            dataIndex: 'systemName',
            key: 'systemName',
        },
        {
            title: '通信类型',
            width: 150,
            dataIndex: 'cmType',
            key: 'cmType',
            render:(value,index,record)=>{
                if(record.cmType == 0){
                    return 'HTTP'
                }else if(record.cmType == 1){
                    return 'MQ'
                }else if(record.cmType == 2){
                    return 'SOCKET短连接'
                }else if(record.cmType == 3){
                    return 'SOCKET长连接'
                }else if(record.cmType == 4){
                    return 'UCP'
                }else if(record.cmType == 5){
                    return 'FCSBDSP'
                }else if(record.cmType == 6){
                    return 'HTTPS'
                }else{
                    return record.cmType
                }
            }
        }
    ];
}