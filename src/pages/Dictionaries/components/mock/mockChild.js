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
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: '值',
            dataIndex: 'value',
            key: 'value',
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
            name:'名称',
            key:'name',
            type:'input',
            required:true,
            max:50
        },
        {
            name:'值',
            key:'value',
            required:true,
            type:'input',
            max:50
        },
        {
            name:'备注',
            key:'note',
            type:'textarea',
            max:200
        }
    ]
}
