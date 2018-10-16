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
            title: '字典名称',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: '字典编码',
            dataIndex: 'code',
            key: 'code',
            width: 150,
        },
        {
            title: '备注',
            width: 150,
            dataIndex: 'note',
            key: 'note'
        }
    ];
}
export function getFields(){
    return [
        {
            name:'字典名称',
            key:'name',
            type:'input',
            required:true,
            max:50
        },
        {
            name:'字典编码',
            key:'code',
            required:true,
            type:'input',
            max:20
        },
        {
            name:'备注',
            key:'note',
            type:'textarea',
            max:200
        }
    ]
}
export function filter(){
    return [
        {label:'字典名称', value:'name',key:'name'},
        {label:'字典编码', value:'code',key:'code'},
    ]
}