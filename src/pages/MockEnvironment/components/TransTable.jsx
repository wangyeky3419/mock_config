import React, { Component } from 'react';
import { Button, Pagination, Loading } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import SearchTool from '../../../components/SearchTool';
import TransTableAdd from './TransTableAdd';
import * as commonFn from '../../../utils/commonFn';
import * as mock from './mock/transMock';

export default class TransTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading:false,
            current:0,
            selectData:[],
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
    }
    componentDidMount(){
        this.onRefresh()
    }
    //搜索请求
    search = (searchField) => {
        console.log('发起搜索请求');
        this.onRefresh()
    }
    AddSubmit = (submitData) => {
        console.log('提交了',submitData)
    }
    handleRemove = (value, index) => {
        //删除，调用删除请求
        const { dataSource } = this.state;
        dataSource.splice(index, 1);
        this.setState({
            dataSource,
        });
    };
    //新增弹框
    onAddOpen = () => {
        this.openAddElement.onAddOpen()
    };
     //删除
    onDel = () => {
        let ids = this.state.rowSelection.selectedRowKeys
        commonFn.confirm(ids,'','删除')
    }
    
    //启用
    onWork = () => {
        let selectData = this.state.selectData
        commonFn.confirm(selectData,'','运行',true)
    }
    //禁用
    onStop = () => {
        let selectData = this.state.selectData
        commonFn.confirm(selectData,'','停止',true)
    }
    //刷新
    onRefresh = () => {
        this.setState({
            loading:true
        })
        setTimeout(()=>{
            this.setState({
                loading:false
            })
        },1500)
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
                <Button type="primary" size="small" onClick={() => this.onDel()} style={{marginBottom:'4px',marginLeft:'4px'}}>删除</Button>                
                <Button type="primary" size="small" onClick={() => this.onWork()} style={{marginBottom:'4px',marginLeft:'4px'}}>启用</Button>                
                <Button type="primary" size="small" onClick={() => this.onStop()} style={{marginBottom:'4px',marginLeft:'4px'}}>禁用</Button>                
                <Button type="primary" size="small" onClick={() => this.onRefresh()} style={{marginBottom:'4px',marginLeft:'4px'}}>刷新</Button>                
                <SearchTool filter={mock.filter()} search={this.search}/>
                <div style={{width:'100%',overflow:'auto'}}>
                    <Loading visible={this.state.loading} shape="fusion-reactor">
                        <CustomTable
                            dataSource={this.state.dataSource}
                            columns={mock.columns()}
                            hasBorder={false}
                            rowSelection={this.state.rowSelection}
                        />
                    </Loading>
                </div>
                <Pagination 
                        current={this.state.current} 
                        onChange={this.handleChange.bind(this)} 
                        shape="arrow-only"
                        pageSizeSelector="dropdown"
                        pageSizePosition="end"
                        total={50}
                        onPageSizeChange={handlePageSizeChange}
                        style={{marginTop:'20px'}}/>
                <TransTableAdd ref={el => this.openAddElement = el} AddSubmit={this.AddSubmit}/>
            </IceContainer>
        </div>
        );
    }
}
