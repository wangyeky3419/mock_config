//表格信息
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
            title: '系统编码',
            dataIndex: 'systemCode',
            key: 'systemCode',
            width: 150,
        },
        {
            title: '系统名称',
            dataIndex: 'systemName',
            key: 'systemName',
            width: 150,
        },
        {
            title: '请求报文类型',
            width: 150,
            dataIndex: 'reqMessageType',
            key: 'reqMessageType',
        },
        {
            title: '响应报文类型',
            width: 150,
            dataIndex: 'rspMessageType',
            key: 'rspMessageType',
        },
        {
            title: '编码类型',
            width: 150,
            dataIndex: 'messageEncoding',
            key: 'messageEncoding',
        },
        {
            title: '系统描述',
            width: 150,
            dataIndex: 'descript',
            key: 'descript',
        },
        {
            title: '可用状态',
            width: 150,
            dataIndex: 'status',
            key: 'status',
            render:(value,index,record)=>{
                if(record.status=='0'){
                    return '不可用';
                }else if(record.status=='1'){
                    return '可用';
                }else{
                    return record.status;
                }
            }
        }
    ]
}
//搜索信息
export function filter(){
    return [
        {label:'系统编码', value:'systemCode',key:'systemCode'},
        {label:'系统名称', value:'systemName',key:'systemName'},
        {
            label:'请求报文类型', 
            value:'reqMessageType',
            key:'reqMessageType',
            option:[
                {label:'common', value:'common'},
                {label:'xml', value:'xml'},
                {label:'json', value:'json'},
                {label:'iso8583', value:'iso8583'}
            ]
        },
        {
            label:'响应报文类型', 
            value:'rspMessageType',
            key:'rspMessageType',
            option:[
                {label:'common', value:'common'},
                {label:'xml', value:'xml'},
                {label:'json', value:'json'},
                {label:'iso8583', value:'iso8583'}
            ]
        },
        {
            label:'编码类型', 
            value:'messageEncoding',
            key:'messageEncoding',
            option:[
                {label:'GBK', value:'GBK'},
                {label:'GB2312', value:'GB2312'},
                {label:'UTF-8', value:'UTF-8'}
            ]
        },
        {
            label:'可用状态', 
            value:'status',
            key:'status',
            option:[
                {label:'可用', value:'1'},
                {label:'不可用', value:'0'}
            ]
        }
    ]
}
 //新增/修改弹框
export function getFields(){
    return  [
        {
            name:'系统编码',
            key:'systemCode',
            type:'input',
            required:true,
            max:20
        },
        {
            name:'系统名称',
            key:'systemName',
            type:'input',
            required:true,
            max:20
        },
        {
            name:'请求报文类型', 
            key:'reqMessageType',
            type:'select',
            required:true,
            selectData:[
                {label:'common', value:'common', key:'common'},
                {label:'xml', value:'xml', key:'xml'},
                {label:'json', value:'json', key:'json'},
                {label:'iso8583', value:'iso8583', key:'iso8583'}
            ]
        },
        {
            name:'响应报文类型', 
            key:'rspMessageType',
            type:'select',
            required:true,
            selectData:[
                {label:'common', value:'common', key:'common'},
                {label:'xml', value:'xml', key:'xml'},
                {label:'json', value:'json', key:'json'},
                {label:'iso8583', value:'iso8583', key:'iso8583'}
            ]
        },
        {
            name:'编码类型', 
            key:'messageEncoding',
            type:'select',
            required:true,
            selectData:[
                {label:'GBK', value:'GBK',key:'GBK'},
                {label:'GB2312', value:'GB2312',key:'GB2312'},
                {label:'UTF-8', value:'UTF-8',key:'UTF-8'}
            ]
        },
        {
            name:'系统描述',
            key:'descript',
            type:'textarea',
            max:500
        },
        {
            name:'可用状态',
            key:'status',
            type:'select',
            required:true,
            selectData : [
                {label:'可用', value:'1', key:'1'},
                {label:'不可用', value:'0', key:'0'},
            ]
        },
       
    ]
}