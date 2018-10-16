import React, { Component } from 'react';
import { Pagination } from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import SearchTool from '../../../components/SearchTool';
const MOCK_DATA = [
    {
        id:'1',
        systemCode: 'COBP',
        systemVersion: '1.0',
        mockType:'VC',
        runStatus:'1',
        pubStatus:'0',
        pubTime:'2018-07-16 18:47:20'
    },
    {
        id:'2',
        systemCode: 'CNP2',
        systemVersion: '1.0',
        mockType:'VS',
        runStatus:'0',
        pubStatus:'1',
        pubTime:'2018-07-16 18:47:20'
    }
    
];

export default class SystemTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: MOCK_DATA,
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
                title: '系统编码',
                dataIndex: 'systemCode',
                key: 'systemCode',
            },
            {
                title: '版本号',
                dataIndex: 'systemVersion',
                key: 'systemVersion',
            },
            {
                title: '仿真类型',
                dataIndex: 'mockType',
                key: 'mockType',
                render:(value,index,record)=>{
                    if(record.mockType==='VC'){
                        return "仿客户端";
                    }else if(record.mockType==='VS'){
                        return "仿服务端";
                    }else {
                        return record.mockType
                    }
                }
            },
            {
                title: '运行状态',
                dataIndex: 'runStatus',
                key: 'runStatus',
                render:(value,index,record)=>{
                    if (record.mockType === 'VS') {
                        if (record.runStatus == '0') {
                            return '停止';
                        } else if (record.runStatus == '1') {
                            return '运行';
                        } else {
                            return record.runStatus;
                        }
                    } else {
                        return "-";
                    }
                }
            },
            {
                title: '发布状态',
                dataIndex: 'pubStatus',
                key: 'pubStatus',
                render:(value,index,record)=>{
                    if (record.pubStatus == '0') {
                        return '未发布';
                    } else if(record.pubStatus == '1') {
                        return '已发布';
                    }else{
                        return record.pubStatus;
                    }
                }
            },
            {
                title: '发布时间',
                dataIndex: 'pubTime',
                key: 'pubTime'
            }
        ];
        //创建搜索
        this.filter = 
            [
                {label:'系统编码', value:'systemCode',key:'systemCode'},
                {label:'系统名称', value:'systemName',key:'systemName'},
                {
                    label:'运行状态', 
                    value:'runStatus',
                    key:'runStatus',
                    option:[
                        {label:'停止', value:'0'},
                        {label:'运行', value:'1'}
                    ]
                },
                {
                    label:'发布状态', 
                    value:'pubStatus',
                    key:'pubStatus',
                    option:[
                        {label:'已发布', value:'1'},
                        {label:'未发布', value:'0'}
                    ]
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
        console.log(this.openElement)
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