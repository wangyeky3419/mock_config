import React, { Component } from 'react';
import { Button, Feedback, Dialog, Loading, Tab } from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
import * as action from '../../../utils/commonFn';
const Toast = Feedback.toast;
const TabPane = Tab.TabPane;
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
        version:'1.0',
        children:[
            {
                id:'3',
                systemCode: 'NP2',
                messageCode: 'common',
                messageName: '交易枢纽',
                messageType:'common',
                prefix:'0',
                suffix:'1',
                keyValueSeparator:'key-value-separator',
                keyValuePairSeparator:'IO',
                messageEncoding:'UTF-8',
                messageIo:'O',
                packMode:'0',
                version:'1.0',
            }
        ]
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
export default class TrabsTempTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: MOCK_DATA,
            selectDataReq:[],
            loadingReq:false,
            selectDataRsp:[],
            loadingRsp:false,
            rowSelectionReq: {
                    onChange: this.onRowChangeReq.bind(this),
                    onSelect: function(selected, record, records) {
                        //获取单选数据
                        console.log("onSelect", selected, record, records);
                    },
                    onSelectAll: function(selected, records) {
                        //获取全选数据
                        console.log("onSelectAll", selected, records);
                    },
                    selectedRowKeysReq: [],
                    getProps: record => {
                        return {
                            disabled: record.id === 100306660941
                        };
                    }
                },
            rowSelectionRsp: {
                onChange: this.onRowChangeRsp.bind(this),
                onSelect: function(selected, record, records) {
                    //获取单选数据
                    console.log("onSelect", selected, record, records);
                },
                onSelectAll: function(selected, records) {
                    //获取全选数据
                    console.log("onSelectAll", selected, records);
                },
                selectedRowKeysRsp: [],
                getProps: record => {
                    return {
                        disabled: record.id === 100306660941
                    };
                }
            }
        };
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
                title: '字段英文名',
                dataIndex: 'systemCode',
                key: 'systemCode',
                width: 150,
            },
            {
                title: '字段中文名',
                dataIndex: 'messageCode',
                key: 'messageCode',
                width: 150,
            },
            {
                title: '字节数',
                dataIndex: 'messageName',
                key: 'messageName',
                width: 150,
            },
            {
                title: '必输标识',
                width: 150,
                dataIndex: 'messageType',
                key: 'messageType',
            },
            {
                title: '域类型',
                width: 150,
                dataIndex: 'prefix',
                key: 'prefix'
            },
            {
                title: '域类型参数1',
                width: 150,
                dataIndex: 'suffix',
                key: 'suffix'
            },
            {
                title: '域类型参数2',
                width: 150,
                dataIndex: 'keyValueSeparator',
                key: 'keyValueSeparator'
            },
            {
                title: '域类型参数3',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '编码',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '转换规则类别',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '转换规则名称',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '转换规则参数',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '解析规则类别',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '解析规则名称',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '解析规则参数',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '组包规则类别',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '组包规则名称',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '组包规则参数',
                width: 150,
                dataIndex: 'messageEncoding',
                key: 'messageEncoding'
            },
            {
                title: '业务读写',
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
            }
        ];
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
        this.onRefreshReq()
    }
//============================Req===Top===================
    //刷新
    onRefreshReq = () => {
        this.setState({
            loadingReq:true
        })
        let self = this;
        setTimeout(function(){
            self.setState({
                loadingReq:false
            })
        }, 1000);
    }
    AddSubmitReq = (values) => {
        console.log('提交',values)
        //发送请求，回调公共组件
        this.openAddElement.AddFinish()
    }
    EditSubmitReq = (values) => {
        console.log('修改了',values);
        //发送请求，回调公共组件
        let self = this;
        setTimeout(function(){
            self.openEditElementReq.EditFinish()
            Toast.success('修改成功')
        }, 2000);
    }
    //新增弹框
    onAddOpenReq = () => {
        this.openAddElementReq.onAddOpen()
    };
    //编辑弹框
    onEditOpenReq = () => {
        if(this.state.selectDataReq.length==1){
            this.openEditElementReq.onEditOpen(this.state.selectDataReq[0])
        }else{
            Toast.prompt('请选择一行数据')
        }
    };
    //删除
    onDelReq = () => {
        let ids = this.state.rowSelectionReq.selectedRowKeysReq
        action.confirm(ids,'','删除')
    }
    //导入
    onImportReq = () => {
        // this.openAddElement.onAddOpen()
    };
    //选择
    onRowChangeReq(ids, records) {
        let { rowSelectionReq } = this.state;
        rowSelectionReq.selectedRowKeysReq = ids;
        //在此处可以调用删除接口，实现多条删除
        this.setState({ rowSelectionReq });
        this.setState({
            selectDataReq:records
        })
    }
    //============================Req===End===================
    //============================Rsp===Top===================
    //刷新
    onRefreshRsp = () => {
        this.setState({
            loadingRsp:true
        })
        let self = this;
        setTimeout(function(){
            self.setState({
                loadingRsp:false
            })
        }, 1000);
    }
    AddSubmitRsp = (values) => {
        console.log('提交',values)
        //发送请求，回调公共组件
        this.openAddElementRsp.AddFinish()
    }
    EditSubmitRsp = (values) => {
        console.log('修改了',values);
        //发送请求，回调公共组件
        let self = this;
        setTimeout(function(){
            self.openEditElementRsp.EditFinish()
            Toast.success('修改成功')
        }, 2000);
    }
    //新增弹框
    onAddOpenRsp = () => {
        this.openAddElementRsp.onAddOpen()
    };
    //编辑弹框
    onEditOpenRsp = () => {
        if(this.state.selectDataRsp.length==1){
            this.openEditElementRsp.onEditOpen(this.state.selectDataRsp[0])
        }else{
            Toast.prompt('请选择一行数据')
        }
    };
    //删除
    onDelRsp = () => {
        let ids = this.state.rowSelectionRsp.selectedRowKeysRsp
        action.confirm(ids,'','删除')
    }
    //导入
    onImportRsp = () => {
        // this.openAddElement.onAddOpen()
    };
    //选择
    onRowChangeRsp(ids, records) {
        console.log('ids',ids)
        let { rowSelectionRsp } = this.state;
        rowSelectionRsp.selectedRowKeysRsp = ids;
        //在此处可以调用删除接口，实现多条删除
        this.setState({ rowSelectionRsp });
        this.setState({
            selectDataRsp:records
        })
        console.log('keys',this.state.selectDataRsp)
    }
    //============================Rsp===End===================
    render() {
        return (
            <div className="tab-table">
                <IceContainer>
                    <Tab size="small">
                        <TabPane key="reqTemp" tab="请求">
                            <Button type="primary" size="small" onClick={() => this.onAddOpenReq()} style={{marginBottom:'4px',marginLeft:'2px'}}>新增</Button>                
                            <Button type="primary" size="small" onClick={() => this.onEditOpenReq()} style={{marginBottom:'4px',marginLeft:'4px'}}>修改</Button>                
                            <Button type="primary" size="small" onClick={() => this.onDelReq()} style={{marginBottom:'4px',marginLeft:'4px'}}>删除</Button>
                            <Button type="primary" size="small" onClick={() => this.onImportReq()} style={{marginBottom:'4px',marginLeft:'4px'}}>导入</Button>
                            <Button type="primary" size="small" onClick={() => this.onRefreshReq()} style={{marginBottom:'4px',marginLeft:'4px'}}>刷新</Button>                
                            <Loading visible={this.state.loadingReq} shape="fusion-reactor" style={{width:'100%'}}>
                                <CustomTable
                                    dataSource={this.state.dataSource}
                                    columns={this.columns}
                                    hasBorder={false}
                                    rowSelection={this.state.rowSelectionReq}
                                    isTree
                                />
                            </Loading>
                            <AddModal ref={el => this.openAddElementReq = el} AddSubmit={this.AddSubmitReq} fields={this.getFields()}/>
                            <EditModal ref={el => this.openEditElementReq = el} EditSubmit={this.EditSubmitReq} fields={this.getFields()}/>
                        </TabPane>
                        <TabPane key="rspTemp" tab="响应">
                            <Button type="primary" size="small" onClick={() => this.onAddOpenRsp()} style={{marginBottom:'4px',marginLeft:'2px'}}>新增</Button>                
                            <Button type="primary" size="small" onClick={() => this.onEditOpenRsp()} style={{marginBottom:'4px',marginLeft:'4px'}}>修改</Button>                
                            <Button type="primary" size="small" onClick={() => this.onDelRsp()} style={{marginBottom:'4px',marginLeft:'4px'}}>删除</Button>
                            <Button type="primary" size="small" onClick={() => this.onImportRsp()} style={{marginBottom:'4px',marginLeft:'4px'}}>导入</Button>
                            <Button type="primary" size="small" onClick={() => this.onRefreshRsp()} style={{marginBottom:'4px',marginLeft:'4px'}}>刷新</Button>                
                            <Loading visible={this.state.loadingRsp} shape="fusion-reactor" style={{width:'100%'}}>
                                <CustomTable
                                    dataSource={this.state.dataSource}
                                    columns={this.columns}
                                    hasBorder={false}
                                    rowSelection={this.state.rowSelectionRsp}
                                    isTree
                                />
                            </Loading>
                            <AddModal ref={el => this.openAddElementRsp = el} AddSubmit={this.AddSubmitRsp} fields={this.getFields()}/>
                            <EditModal ref={el => this.openEditElementRsp = el} EditSubmit={this.EditSubmitRsp} fields={this.getFields()}/>
                        </TabPane>
                    </Tab>

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