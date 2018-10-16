import React, { Component } from 'react';
import { Button, Pagination, Loading, Feedback} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
import SearchTool from '../../../components/SearchTool';
import * as action from '../../../utils/commonFn';
import AddParamModal from '../../../components/envParamComponent/AddParamModal';
const Toast = Feedback.toast;
import * as mock from './mock';
const MOCK_DATA = [
    {
        accountingDate: '2018-08-20',
        systemCode: 'COBP',
        systemName: '交易银行业务枢纽',
        cmType: '1',
        id:1
    },
    {
        accountingDate: '2013-10-12',
        systemCode: 'COBP',
        systemName: '交易银行业务枢纽',
        cmType: '3',
        id:2
    }
];

export default class Table extends Component {
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
        
        //创建搜索
        this.filter = 
            [
                {label:'会计日期', value:'age',key:2},
                {
                    label:'通信类型', 
                    value:'gender',
                    key:3,
                    option:[
                        {
                            label:'HTTP',
                            value:'1'
                        },
                        {
                            label:'MQ',
                            value:'2'
                        },
                        {
                            label:'SOCKET短连接',
                            value:'3'
                        },
                        {
                            label:'SOCKET长连接',
                            value:'4'
                        },
                        {
                            label:'UCP',
                            value:'5'
                        },
                        {
                            label:'FCSBDSP',
                            value:'6'
                        },
                        {
                            label:'HTTPS',
                            value:'7'
                        }
                    ]
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
  
    EditSubmit = (values) => {
        console.log('修改了',values)
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
        console.log('this.props.mockType',this.props.mockType)
        this.addEnvParamElement.onAddOpen(this.props.mockType)
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
    //分页
    handleChange(current) {
        console.log('current',current)
        this.setState({
            current
        });
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
                <Loading visible={this.state.loading} shape="fusion-reactor">
                    <CustomTable
                        dataSource={this.state.dataSource}
                        columns={mock.columns()}
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
                {/* 环境参数 */}
                <AddParamModal ref={el => this.addEnvParamElement = el} AddSubmit={this.AddSubmit}/>
                {/* <EditModal ref={el => this.openEditElement = el} EditSubmit={this.EditSubmit} fields={this.getFields()}/>
                <AddModal ref={el => this.openAddElement = el} AddSubmit={this.AddSubmit} fields={this.getFields()}/> */}
            </IceContainer>
        </div>
        );
    }
}
