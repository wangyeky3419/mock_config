export function columns(){
    return [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: 80,
            render: (value, index, record) => {
                return index+1
            },
        },
        {
            title: '用户名',
            dataIndex: 'shortName',
            key: 'shortName',
            width: 150,
        },
        {
            title: '场景名称',
            width: 150,
            dataIndex: 'articleNum',
            key: 'articleNum',
        },
        {
            title: '响应模板',
            width: 150,
            dataIndex: 'articleNum',
            key: 'articleNum',
        },
        {
            title: '场景描述',
            width: 150,
            dataIndex: 'articleNum',
            key: 'articleNum',
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            render: (value, index, record) => {
                return (
                    <span>
                    <EditModal
                        index={index}
                        record={record}
                        getFormValues={this.getFormValues}
                        fields={this.getFields()}
                        EditSubmit={this.EditSubmit}
                    />
                    <Button type="primary" size="small">查看</Button>                
                    </span>
                );
            },
        }
    ];
}
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
export function filter(){
    return [
        {label:'用户名', value:'name',key:1},
        {label:'场景名称', value:'age',key:2},
        {label:'响应模板', value:'12',key:3},
    ]
}