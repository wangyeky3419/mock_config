import React, { Component } from 'react';
import { Button, Pagination, Feedback, Loading } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
import SearchTool from '../../../components/SearchTool';
import * as action from '../../../utils/commonFn';
const Toast = Feedback.toast;
const MOCK_DATA = [
    {
        id:'1',
        systemCode: 'COBP',
        messageCode: 'master',
        messageName: '交易银行业务枢纽',
        messageType:'common',
        prefix:'0',
        suffix:'1',
        keyValueSeparator:'key-value-separator',
        keyValuePairSeparator:'IO',
        messageEncoding:'GBK',
        messageIo:'I',
        packMode:'0',
        version:'1.0'
    },
    {
        id:'2',
        systemCode: 'COBP',
        messageCode: 'master',
        messageName: '交易银行业务枢纽',
        messageType:'key-value-separator',
        prefix:'022',
        suffix:'11',
        keyValueSeparator:'ww',
        keyValuePairSeparator:'IO',
        messageEncoding:'UTF-8',
        messageIo:'O',
        packMode:'1',
        version:'2.0'
    }
];
export default class TablePublic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: MOCK_DATA,
            selectData:[],
            loading:false,
            rowSelection: {
                    onChange: this.onRowChange.bind(this),
                    onSelect: function(selected, record, records) {
                    },
                    onSelectAll: function(selected, records) {
                    },
                    selectedRowKeys: [],
                    getProps: record => {
                        return {
                            disabled: record.id === 100306660941
                        };
                    }
                }
        };
        this.handleChange = this.handleChange.bind(this);
        this.columns = [
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
                title: '模板编码',
                dataIndex: 'messageCode',
                key: 'messageCode',
                width: 150,
            },
            {
                title: '模板名称',
                dataIndex: 'messageName',
                key: 'messageName',
                width: 150,
            },
            {
                title: '报文类型',
                width: 150,
                dataIndex: 'messageType',
                key: 'messageType',
                render:(value,index,record)=>{
                    if (record.messageType == 'key-value-separator') {
                        return '键值分割';
                    }else{
                        return record.messageType
                    }
                }
            },
            {
                title: '报文前缀',
                width: 150,
                dataIndex: 'prefix',
                key: 'prefix'
            },
            {
                title: '报文后缀',
                width: 150,
                dataIndex: 'suffix',
                key: 'suffix'
            },
            {
                title: '键值分隔符',
                width: 150,
                dataIndex: 'keyValueSeparator',
                key: 'keyValueSeparator'
            },
            {
                title: '编码类型',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '输入输出',
                width: 150,
                dataIndex: 'messageIo',
                key: 'messageIo',
                render:(value,index,record)=>{
                    if (record.messageIo == 'I') {
                        return '输入';
                    } else if (record.messageIo == 'O') {
                        return '输出';
                    }else {
                        return record.messageIo
                    }
                }
            },
            {
                title: '组包方式',
                width: 150,
                dataIndex: 'packMode',
                key: 'packMode',
                render:(value,index,record)=>{
                    if (record.packMode == '0') {
                        return '正常组包';
                    }else if (record.packMode == '1') {
                        return '模板组包';
                    }else{
                        return record.packMode
                    }
                }
            },
            {
                title: '版本号',
                width: 150,
                dataIndex: 'version',
                key: 'version'
            }
        ];
        //创建搜索
        this.filter = 
            [
                {label:'模板编码', value:'messageCode',key:'messageCode'},
                {label:'模板名称', value:'messageName',key:'messageName'},
                {
                    label:'报文类型', 
                    value:'messageType',
                    key:'messageType',
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
            ]
    }
    //创建新增/编辑弹框
    getFields = () => {
        return [
                {
                    name:'模板编码',
                    key:'messageCode',
                    type:'input',
                    required:true,
                },
                {
                    name:'模板名称',
                    key:'messageName',
                    required:true,
                    type:'input'
                },
                {
                    name:'报文前缀',
                    key:'prefix',
                    type:'input'
                },
                {
                    name:'报文后缀',
                    key:'suffix',
                    type:'input'
                },
                {
                    name:'键值分隔符',
                    key:'keyValueSeparator',
                    type:'input'
                },
                {
                    name:'键值对分隔符',
                    key:'keyValuePairSeparator',
                    type:'input'
                },
                {
                    name:'报文类型',
                    key:'messageType',
                    type:'select',
                    required:true,
                    selectData : [
                        {label:'common', value:'common', key:'common'},
                        {label:'xml', value:'xml', key:'xml'},
                        {label:'json', value:'json', key:'json'},
                        {label:'键值分割', value:'key-value-separator', key:'key-value-separator'}
                    ]
                },
                {
                    name:'编码类型',
                    key:'messageEncoding',
                    type:'select',
                    required:true,
                    selectData : [
                        {label:'GBK', value:'GBK', key:'GBK'},
                        {label:'GB2312', value:'GB2312', key:'GB2312'},
                        {label:'UTF-8', value:'UTF-8', key:'UTF-8'},
                        {label:'EBCDIC', value:'EBCDIC', key:'EBCDIC'},
                        {label:'iso8583', value:'iso8583', key:'iso8583'}
                    ]
                },
                {
                    name:'组包方式',
                    key:'packMode',
                    type:'select',
                    required:true,
                    selectData : [
                        {label:'正常组包', value:'0', key:'0'},
                        {label:'模板组包', value:'1', key:'1'}
                    ]
                },
            ]
    }
    componentDidMount(){
        this.onRefresh()
    }
    //搜索请求
    search = (searchField) => {
        console.log('发起搜索请求')
        this.onRefresh()
    }
    //刷新
    onRefresh = () => {
        this.setState({
            loading:true
        })
        let self = this;
        setTimeout(function(){
            self.setState({
                loading:false
            })
        }, 1000);
    }
    AddSubmit = (values) => {
        console.log('提交',values)
        //发送请求，回调公共组件
        this.openAddElement.AddFinish()
    }
    EditSubmit = (values) => {
        console.log('修改了',values);
        //发送请求，回调公共组件
        let self = this;
        setTimeout(function(){
            self.openEditElement.EditFinish()
            Toast.success('修改成功')
        }, 2000);
    }
    //新增弹框
    onAddOpen = () => {
        this.openAddElement.onAddOpen()
    };
    //编辑弹框
    onEditOpen = () => {
        if(this.state.selectData.length==1){
            this.openEditElement.onEditOpen(this.state.selectData[0])
        }else{
            Toast.prompt('请选择一行数据')
        }
    };
    //删除
    onDel = () => {
        let ids = this.state.rowSelection.selectedRowKeys
        action.confirm(ids,'','删除')
    }
    //选择
    onRowChange(ids, records) {
        let { rowSelection } = this.state;
        rowSelection.selectedRowKeys = ids;
        //在此处可以调用删除接口，实现多条删除
        this.setState({ rowSelection });
        this.setState({
            selectData:records
        })
    }
    //分页
    handleChange(current) {
        console.log('current',current)
        this.setState({
            current
        });
    }
    render() {
        const handlePageSizeChange = size => console.log(size);
        return (
            <div className="tab-table">
                <IceContainer>
                    <Button type="primary" size="small" onClick={() => this.onAddOpen()} style={{marginBottom:'4px',marginLeft:'2px'}}>新增</Button>                
                    <Button type="primary" size="small" onClick={() => this.onEditOpen()} style={{marginBottom:'4px',marginLeft:'4px'}}>修改</Button>                
                    <Button type="primary" size="small" onClick={() => this.onDel()} style={{marginBottom:'4px',marginLeft:'4px'}}>删除</Button>
                    <Button type="primary" size="small" onClick={() => this.onRefresh()} style={{marginBottom:'4px',marginLeft:'4px'}}>刷新</Button>                
                    <SearchTool filter={this.filter} search={this.search}/>
                    <Loading visible={this.state.loading} shape="fusion-reactor" style={{width:'100%'}}>
                        <CustomTable
                            dataSource={this.state.dataSource}
                            columns={this.columns}
                            hasBorder={false}
                            rowSelection={this.state.rowSelection}
                        />
                    </Loading>
                    <Pagination 
                        current={this.state.current} 
                        onChange={this.handleChange} 
                        shape="arrow-only"
                        pageSizeSelector="dropdown"
                        pageSizePosition="end"
                        total={50}
                        onPageSizeChange={handlePageSizeChange}
                        style={{marginTop:'20px'}}/>
                    <AddModal ref={el => this.openAddElement = el} AddSubmit={this.AddSubmit} fields={this.getFields()}/>
                    <EditModal ref={el => this.openEditElement = el} EditSubmit={this.EditSubmit} fields={this.getFields()}/>
                </IceContainer>
            </div>
        );
    }
}
const styles = {
    contentText: {
        padding: '5px 0 15px',
    },
};