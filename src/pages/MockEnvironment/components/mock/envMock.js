export function getFields(){
    return [
        {
            name:'环境名称',
            key:'envName',
            type:'input',
            required:true,
        },
        {
            name:'环境编码',
            key:'envCode',
            required:true,
            type:'input'
        },
        {
            name:'备注',
            key:'remark',
            type:'textarea'
        }
    ]
}
export function getEditFields(){
    return [
        {
            name:'环境名称',
            key:'envName',
            type:'input',
            required:true,
        },
        {
            name:'环境编码',
            key:'envCode',
            disabled:true,
            type:'input'
        },
        {
            name:'备注',
            key:'remark',
            type:'textarea'
        }
    ]
}
export function filter(){
    return [
        {label:'环境编码', value:'envCode',key:'envCode'},
        {label:'环境名称', value:'envName',key:'envName'}
    ]
}