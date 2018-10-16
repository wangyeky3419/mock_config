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
            title: '规则编码',
            dataIndex: 'ruleCode',
            key: 'ruleCode',
            width: 150,
        },
        {
            title: '规则中文名',
            width: 150,
            dataIndex: 'ruleName',
            key: 'ruleName',
        },
        {
            title: '规则状态',
            width: 150,
            dataIndex: 'ruleState',
            key: 'ruleState',
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            render: (value, index, record) => {
                return (
                    <span>
                    <MappingRuleDetail
                        index={index}
                        record={record}
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
            name:'规则编码',
            key:'ruleCode',
            required:true,
            type:'input'
        },
        {
            name:'规则名称',
            key:'ruleName',
            required:true,
            type:'input'
        },
        {
            name:'返回值类型',
            key:'resultType',
            type:'select',
            required:true,
            selectData : [
                {label:'String', value:'String',key:1},
                {label:'Boolean', value:'Boolean',key:2},
            ]
        },
        {
            name:'规则描述',
            key:'ruleDesc',
            type:'textarea',
        },
        {
            name:'规则代码',
            key:'ruleRsement',
            type:'textarea',
        },
        {
            name:'规则DEMO',
            key:'ruleDemo',
            type:'textarea',
        }
    ]
}
export function filter(){
    return [
        {label:'规则编码', value:'name',key:1},
        {label:'规则中文名', value:'age',key:2},
        {
            label:'规则状态', 
            value:'gender',
            key:3,
            option:[
                {
                    label:'可用',
                    value:'1'
                },
                {
                    label:'不可用',
                    value:'0'
                }
            ]
        }
    ]
}