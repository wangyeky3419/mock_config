import React, { Component } from 'react';
import { Button, Pagination, Feedback, Loading } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
import SearchTool from '../../../components/SearchTool';
import TempDetail from './TempDetail';
import * as action from '../../../utils/commonFn';
const Toast = Feedback.toast;
const MOCK_DATA = [
    {
        id:'1',
        messageCode: 'master',
        messageName: '交易银行业务枢纽',
        messageIo:'I',
        istermcheck:0,
        isdefmodel:1,
        note:'模板描述哈哈哈哈按揭房是大家疯狂的瞬间反对方肌肤衰老的风景啊发可是大粉红色牛肉割肉角色发欧服哦日复而无澳纽饭否热敷哦啊阿苏分哦色如给发热学哦 给发热携手官方u家法律上的叫法放假了卡及法律的看法啊啊啊啊啊！！！'
    },
    {
        id:'2',
        messageCode: 'master',
        messageName: '交易银行业务枢纽',
        messageIo:'O',
        istermcheck:1,
        isdefmodel:0,
        note:'未描述'
    }
];
export default class TransTempList extends Component {
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
                title: '请求/响应',
                dataIndex: 'messageIo',
                key: 'messageIo',
                width: 150,
                render:function(value,index,record){
                    if (record.messageIo == 'I') {
                        return '请求';
                    }else if(record.messageIo == 'O'){
                        return '响应';
                    }else{
                        return record.messageIo
                    }
                }
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
                title: '模板描述',
                width: 150,
                dataIndex: 'note',
                key: 'note',
                render: (value, index, record) => {
                    return (
                        <span>
                            <TempDetail
                                index={index}
                                record={record}
                            />
                        </span>
                    );
                },
            },
            {
                title: '无条件校验',
                width: 150,
                dataIndex: 'istermcheck',
                key: 'istermcheck',
                render:(value,index,record)=>{
                    if (record.istermcheck == '1') {
                        return '是';
                    } else if (record.istermcheck == '0') {
                        return '否';
                    }else {
                        return record.istermcheck
                    }
                }
            },
            {
                title: '默认模板',
                width: 150,
                dataIndex: 'isdefmodel',
                key: 'isdefmodel',
                render:(value,index,record)=>{
                    if (record.isdefmodel == '1') {
                        return '是';
                    } else if (record.isdefmodel == '0') {
                        return '否';
                    }else {
                        return record.isdefmodel
                    }
                }
            }
        ];
        //创建搜索
        this.filter = 
            [
                {label:'模板编码', value:'messageCode',key:'messageCode'},
                {label:'模板名称', value:'messageName',key:'messageName'}
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
                    name:'模板描述',
                    key:'note',
                    type:'textarea'
                }
            ]
    }
    getFieldsEdit = () => {
        return [
                {
                    name:'模板编码',
                    key:'messageCode',
                    type:'input',
                    disabled:true,
                },
                {
                    name:'模板名称',
                    key:'messageName',
                    disabled:true,
                    type:'input'
                },
                {
                    name:'模板描述',
                    key:'note',
                    type:'textarea'
                }
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
    //启用无条件校验
    useTermcheck = () => {
        if(this.state.selectData.length==1){
            let ids = this.state.rowSelection.selectedRowKeys
            action.confirm(ids,'','启用无条件校验')
        }else{
            Toast.prompt('请选择一行数据')
        }
    }
    //启用默认模板
    useDefmodel = () => {
        if(this.state.selectData.length==1){
            let ids = this.state.rowSelection.selectedRowKeys
            action.confirm(ids,'','启用默认模板')
        }else{
            Toast.prompt('请选择一行数据')
        }
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
                    <Button type="primary" size="small" onClick={() => this.useTermcheck()} style={{marginBottom:'4px',marginLeft:'4px'}}>启用无条件校验</Button>                
                    <Button type="primary" size="small" onClick={() => this.useDefmodel()} style={{marginBottom:'4px',marginLeft:'4px'}}>启用默认模板</Button>                
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
                    <EditModal ref={el => this.openEditElement = el} EditSubmit={this.EditSubmit} fields={this.getFieldsEdit()}/>
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