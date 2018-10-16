import React, { Component } from 'react';
import { Button, Pagination, Feedback, Dialog, Loading } from '@icedesign/base';
import AddModal from '../../../components/AddModal';
import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import SearchTool from '../../../components/SearchTool';
import * as action from '../../../utils/commonFn';
const Toast = Feedback.toast;
const MOCK_DATA = [
    {
        id:'1',
        systemCode: 'COBP',
        systemName: '交易银行业务枢纽',
        systemVersion: '1.0',
        mockType:'VC',
        executorName:'执行机20180709080850',
        runStatus:'1',
        pubStatus:'0',
        pubTime:'2018-07-16 18:47:20',
        paras:'{"httpServerURL":"https://localhost:28001/getInfo","httpContentEncoding":"UTF-8","maxThreadNumber":"","httpContentDecoding":"UTF-8","httpMethod":"POST","specialHttpServerURL":"https://localhost:28001/getInfo=","protocalType":"SSL","authType":"TWO-WAY","trustStorePath":"D:/test/server/server.cer","trustStorePWD":"123456","trustStoreType":"JKS","keyStoreType":"JKS","keyStorePath":"D:/test/client/client.p12","keyStorePWD":"123456","keyPWD":"123456"}'
    },
    {
        id:'2',
        systemCode: 'CNP2',
        systemName: '人行二代支付系统',
        systemVersion: '1.0',
        mockType:'VS',
        executorName:'执行机20180709080850',
        runStatus:'0',
        pubStatus:'1',
        pubTime:'2018-07-16 18:47:20',
        paras:'{"ip":"10.10.10.160","port":"9011"}'
    }
    
];

export default class EnvTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: MOCK_DATA,
            selectData:[],
            loading:false,
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
                title: '系统编码',
                dataIndex: 'systemCode',
                key: 'systemCode',
            },
            {
                title: '系统名称',
                dataIndex: 'systemName',
                key: 'systemName',
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
                title: '执行机名称',
                dataIndex: 'executorName',
                key: 'executorName'
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
            },
            {
                title: '环境参数',
                dataIndex: 'paras',
                width:'50%',
                key: 'paras'
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
    //新增弹框
    onAddOpen = () => {
        this.openAddElement.onAddOpen()
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
                    <Button type="primary" size="small" onClick={() => this.onDel()} style={{marginBottom:'4px',marginLeft:'4px'}}>删除</Button>
                    <Button type="primary" size="small" onClick={() => this.onDel()} style={{marginBottom:'4px',marginLeft:'4px'}}>发布</Button>
                    <Button type="primary" size="small" onClick={() => this.onDel()} style={{marginBottom:'4px',marginLeft:'4px'}}>卸载</Button>
                    <Button type="primary" size="small" onClick={() => this.onDel()} style={{marginBottom:'4px',marginLeft:'4px'}}>运行</Button>
                    <Button type="primary" size="small" onClick={() => this.onDel()} style={{marginBottom:'4px',marginLeft:'4px'}}>停止</Button>
                    <Button type="primary" size="small" onClick={() => this.onRefresh()} style={{marginBottom:'4px',marginLeft:'4px'}}>刷新</Button>                
                    <SearchTool filter={this.filter} search={this.search}/>
                    <Loading visible={this.state.loading} shape="fusion-reactor" style={{width:'100%',overflow:'auto'}}>
                        <CustomTable
                            dataSource={this.state.dataSource}
                            columns={this.columns}
                            hasBorder={false}
                            rowSelection={this.state.rowSelection}
                            style={{width:'2000px'}}
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