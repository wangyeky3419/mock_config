export function columns(){
    return [
        {
            title: '字段英文名',
            dataIndex: 'shortName',
            key: 'shortName',
            width: 150,
        },
        {
            title: '字段中文名',
            width: 150,
            dataIndex: 'articleNum',
            key: 'articleNum',
        },
        {
            title: '字段类型',
            width: 150,
            dataIndex: 'articleNum',
            key: 'articleNum',
        },
        {
            title: '字节数',
            width: 150,
            dataIndex: 'articleNum',
            key: 'articleNum',
        },
        {
            title: '规则类别',
            width: 150,
            dataIndex: 'articleNum',
            key: 'articleNum',
        },
        {
            title: '规则名称',
            width: 150,
            dataIndex: 'articleNum',
            key: 'articleNum',
        },
        {
            title: '规则参数',
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
