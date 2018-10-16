export function columns(){
    return [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: 80,
            render:(index,value,record)=>{
                return index+1;
            }
        },
        {
            title: '交易代码',
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
        }
    ];
}
export function filter(){
    return [
        {label:'交易代码', value:'transCode',key:'transCode'},
        {label:'交易名称', value:'transName',key:'transName'},
        {label:'版本号', value:'transTemplateVersion',key:'transTemplateVersion'}
    ]
}