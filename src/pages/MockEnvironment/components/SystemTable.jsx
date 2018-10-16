import React, { Component } from 'react';
import { Button, Pagination, Loading, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import SearchTool from '../../../components/SearchTool';
import SystemAddTable from './SystemAddTable';
import * as commonFn from '../../../utils/commonFn';
import * as mock from './mock/systemMock';
import * as ajax from '../../../utils/ajax';
const Toast = Feedback.toast;
export default class SystemTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading:false,
            total:0,
            pageSize:10,
            pageNumber:1,
            searchKey:'',
            searchValue:'',
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
     //刷新
     onRefresh = () => {
        let { rowSelection } = this.state;
        rowSelection.selectedRowKeys = [];
        this.setState({
            loading:true,
            rowSelection
        })
        let self = this;
        let params = {
            pageNumber:this.state.pageNumber+"",
            pageSize:this.state.pageSize+"",
            searchType:this.state.searchKey,
            searchText:this.state.searchValue
        }
        params = JSON.stringify(params)
        ajax.getTableData('/mock-server/deploy/getEnvInfoList',params)
        .then(function(response){
            var data = response.data
            if(data.state == 'success'){
                Toast.success(data.statedesc);
                var tableData = JSON.parse(data.content);
                self.setState({
                    dataSource:tableData.rows,
                    loading:false,
                    total:tableData.total,
                    pageSize:tableData.pageSize
                })
            }else{
                self.setState({
                    loading:false,
                })
                Toast.error(data.statedesc);
            }
        }).catch(function(error){
            self.setState({
                loading:false,
            })
            Toast.error('请求异常');
        });
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
    //发布
    onPublish = () => {
        let selectData = this.state.selectData
        commonFn.confirm(selectData,'','发布',true)
    }
    //卸载
    onUnload = () => {
        let selectData = this.state.selectData
        commonFn.confirm(selectData,'','卸载',true)
    }
    //运行
    onWork = () => {
        let selectData = this.state.selectData
        commonFn.confirm(selectData,'','运行',true)
    }
    //停止
    onStop = () => {
        let selectData = this.state.selectData
        commonFn.confirm(selectData,'','停止',true)
    }
   
    //分页
    handleChange = (current) => {
        //由于setState是异步的，所以调用刷新在回调函数里面使用
        this.setState({pageNumber:current}, function () {
            this.onRefresh()
        });
    }
    //选择
    onRowChange = (ids, records) => {
        let { rowSelection } = this.state;
        rowSelection.selectedRowKeys = ids;
        this.setState({
            selectData:records,
            rowSelection
        })
    }
    handlePageSizeChange = (size) => {
        this.setState({pageSize:size},function(){
            this.onRefresh();
        })
    }
    render() {
        return (
        <div className="tab-table">
            <IceContainer>
                <Button type="primary" size="small" onClick={() => this.onAddOpen()} style={{marginBottom:'4px',marginLeft:'2px'}}>新增</Button>                
                <Button type="primary" size="small" onClick={() => this.onDel()} style={{marginBottom:'4px',marginLeft:'4px'}}>删除</Button>                
                <Button type="primary" size="small" onClick={() => this.onPublish()} style={{marginBottom:'4px',marginLeft:'4px'}}>发布</Button>                
                <Button type="primary" size="small" onClick={() => this.onUnload()} style={{marginBottom:'4px',marginLeft:'4px'}}>卸载</Button>                
                <Button type="primary" size="small" onClick={() => this.onWork()} style={{marginBottom:'4px',marginLeft:'4px'}}>运行</Button>                
                <Button type="primary" size="small" onClick={() => this.onStop()} style={{marginBottom:'4px',marginLeft:'4px'}}>停止</Button>                
                <Button type="primary" size="small" onClick={() => this.onRefresh()} style={{marginBottom:'4px',marginLeft:'4px'}}>刷新</Button>                
                <SearchTool filter={mock.filter()} search={this.search}/>
                <div style={{width:'100%',overflow:'auto'}}>
                    <Loading visible={this.state.loading} shape="fusion-reactor">
                        <CustomTable
                            dataSource={this.state.dataSource}
                            columns={mock.columns()}
                            hasBorder={false}
                            style={{width:'2000px'}}
                            rowSelection={this.state.rowSelection}
                        />
                    </Loading>
                </div>
                <Pagination 
                    current={this.state.current} 
                    onChange={this.handleChange} 
                    shape="arrow-only"
                    pageSizeSelector="dropdown"
                    pageSizePosition="end"
                    total={50}
                    onPageSizeChange={this.handlePageSizeChange}
                    style={{marginTop:'20px'}}/>
                <SystemAddTable ref={el => this.openAddElement = el} AddSubmit={this.AddSubmit}/>
            </IceContainer>
        </div>
        );
    }
}
