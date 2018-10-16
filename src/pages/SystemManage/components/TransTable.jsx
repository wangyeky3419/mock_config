import React, { Component } from 'react';
import { Pagination, Button, Feedback, Dialog } from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import SearchTool from '../../../components/SearchTool';
const Toast = Feedback.toast;
const MOCK_DATA = [
    {
        id:'1',
        transCode: 'COBP',
        transName: '交易',
        systemName:'VC',
        transTemplateVersion:'1.0',
        serviceStatus:'0',
    },
    {
        id:'2',
        transCode: 'CNP2',
        transName: '交易2112',
        systemName:'V',
        transTemplateVersion:'2.0',
        serviceStatus:'0',
    }
];

export default class TransTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: MOCK_DATA,
            rowSelection: {
                onChange: this.onRowChange.bind(this),
                onSelect: function(selected, record, records) {
                    //获取单选数据
                    console.log("onSelect", selected, record, records);
                },
                onSelectAll: function(selected, records) {
                    //获取全选数据
                    console.log("onSelectAll", selected, records);
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
                render:(value, index, record) => {
                    return index+1
                }
            },
            {
                title: '交易码',
                dataIndex: 'transCode',
                key: 'transCode',
            },
            {
                title: '交易名称',
                dataIndex: 'transName',
                key: 'transName',
            },
            {
                title: '所属系统',
                dataIndex: 'systemName',
                key: 'systemName'
            },
            {
                title: '版本号',
                dataIndex: 'transTemplateVersion',
                key: 'transTemplateVersion'
            },
            {
                title: '状态标识',
                dataIndex: 'serviceStatus',
                key: 'serviceStatus',
                render:(value,index,record)=>{
                    if(record.serviceStatus=='0'){
                        return '不可用';
                    }else if(record.serviceStatus=='1'){
                        return '可用';
                    }else {
                        return record.serviceStatus
                    }
                }
            }
        ];
        //创建搜索
        this.filter = 
            [
                {label:'交易码', value:'transCode',key:'transCode'},
                {label:'交易名称', value:'transName',key:'transName'},
                {
                    label:'状态标识', 
                    value:'serviceStatus',
                    key:'serviceStatus',
                    option:[
                        {label:'不可用', value:'0'},
                        {label:'可用', value:'1'}
                    ]
                },
                {
                    label:'版本号', 
                    value:'transTemplateVersion',
                    key:'transTemplateVersion'
                },
            ]
    }
    //搜索请求
    search = (searchField) => {
        console.log('发起搜索请求')
    }
    EditSubmit = (values) => {
        console.log('修改了',values)
    }
   
    AddSubmit = (values) => {
        console.log('提交',values)
        //发送请求，回调公共组件
        this.openElement.AddFinish()
    }
    onOpen = () => {
        this.openElement.onAddOpen()
    };
    onDel = () => {
        let ids = this.state.rowSelection.selectedRowKeys
        if(ids.length == 0){
            Toast.prompt("请选择一行数据");
        }else {
            //删除接口调用
            let url = 'www.del'
            Dialog.confirm({
                content: "确定要删除吗？",
                title: "是否删除",
                onOk: () => {
                    console.log('删除请求')
                }
            });
        }
    }
    onRowChange(ids, records) {
        let { rowSelection } = this.state;
        rowSelection.selectedRowKeys = ids;
        console.log("onChange", ids, records);
        //在此处可以调用删除接口，实现多条删除
        this.setState({ rowSelection });
    }
    //分页
    handleChange(current) {
        console.log('current',current)
        this.setState({
            current
        });
    }
    reRefsh = () => {
        //刷新
    }
    render() {
        const handlePageSizeChange = size => console.log(size);
        return (
            <div className="tab-table">
                <IceContainer>
                    <Button type="primary" size="small" onClick={() => this.onOpen()} style={{marginBottom:'4px',marginLeft:'2px'}}>新增</Button>                
                    <Button type="primary" size="small" onClick={() => this.onDel()} style={{marginBottom:'4px',marginLeft:'2px'}}>删除</Button>
                    <Button type="primary" size="small" onClick={() => this.onUse()} style={{marginBottom:'4px',marginLeft:'2px'}}>启用</Button>
                    <Button type="primary" size="small" onClick={() => this.onDeUse()} style={{marginBottom:'4px',marginLeft:'2px'}}>禁用</Button>
                    <Button type="primary" size="small" onClick={() => this.reRefsh()} style={{marginBottom:'4px',marginLeft:'2px'}}>刷新</Button>

                    <SearchTool filter={this.filter} search={this.search}/>
                    <div style={{width:'100%',overflow:'auto'}}>
                        <CustomTable
                            dataSource={this.state.dataSource}
                            columns={this.columns}
                            hasBorder={false}
                            rowSelection={this.state.rowSelection}
                        />
                    </div>
                    
                     <Pagination 
                        current={this.state.current} 
                        onChange={this.handleChange} 
                        shape="arrow-only"
                        pageSizeSelector="dropdown"
                        pageSizePosition="end"
                        total={50}
                        onPageSizeChange={handlePageSizeChange}
                        style={{marginTop:'20px'}}/>
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