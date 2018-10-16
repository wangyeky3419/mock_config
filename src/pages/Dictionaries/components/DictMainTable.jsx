import React, { Component } from 'react';
import { Button, Pagination, Feedback, Dialog, Loading } from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
import SearchTool from '../../../components/SearchTool';
import * as mock from './mock/mockMain';
import * as ajax from '../../../utils/ajax.js';
const Toast = Feedback.toast;
let getFields = [];
export default class DictMainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectData:[],
            loading:false,
            total:0,
            pageSize:10,
            pageNumber:1,
            searchKey:'',
            searchValue:'',
            clickIndex:null,
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
    }
    //搜索请求
    search = (searchKey,searchValue) => {
        this.setState({
            searchKey:searchKey,
            searchValue:searchValue
        },function(){
            this.onRefresh()
        })
    }
    componentDidMount(){
        getFields = mock.getFields()
        this.onRefresh()
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
        ajax.getTableData('/mock-server/sysDataDic/getSysDataDicMain',params)
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
        })
        .catch(function(error){
            self.setState({
                loading:false,
            })
            Toast.error('请求异常');
        });
    }
    //新增弹框
    onAddOpen = () => {
        this.openAddElement.onAddOpen()
    };
    AddSubmit = (values) => {
        //发送请求，回调公共组件
        let self = this;
        values = JSON.stringify(values)
        ajax.addTable('/mock-server/sysDataDic/insertSysDataDicMain',values)
        .then(function(response){
            console.log(1)
            if(response.data.state == 'success'){
                Toast.success(data.statedesc);
                self.onRefresh()
            }else{
                Toast.error(data.statedesc);
            }
            self.openAddElement.AddFinish();
        })
        .catch(function(error){
            console.log(2)
            Toast.error('新增异常');
            self.openAddElement.AddFinish()
        });
        
    }
    //编辑弹框
    onEditOpen = () => {
        if(this.state.selectData.length==1){
            this.openEditElement.onEditOpen(this.state.selectData[0])
        }else{
            Toast.prompt('请选择一行数据')
        }
    };
    EditSubmit = (values) => {
        //发送请求，回调公共组件
        let self = this;
        values = JSON.stringify(values)
        ajax.editTable('/mock-server/sysDataDic/updateSysDataDicMain',values)
        .then(function(response){
            let data = response.data;
            if(response.data.state == 'success'){
                Toast.success(data.statedesc);
                self.onRefresh()
            }else{
                Toast.error(data.statedesc);
            }
            self.openEditElement.EditFinish()
        }).catch(function(error){
            Toast.error('修改异常');
            self.openEditElement.EditFinish()
        });
    }
    //删除
    onDel = () => {
        let self = this;
        let selectData = this.state.selectData;
        let codes = '';
        for(var i = 0; i < selectData.length; i++){
            codes = codes + selectData[i].code + ",";
        }
        codes = codes.substring(0,codes.length-1);
        let params = JSON.stringify({codes:codes})
        if(selectData.length == 0){
            Toast.prompt("请选择一行数据");
        }else {
            //删除接口调用
            Dialog.confirm({
                content: "确定要删除吗？",
                title: "是否删除",
                onOk: () => {
                    ajax.delTable('/mock-server/sysDataDic/deleteSysDataDicMain',params)
                    .then(function(response){
                        let data = response.data;
                        if(data.state == 'success'){
                            Toast.success(data.statedesc);
                            self.onRefresh()
                        }else{
                            Toast.error(data.statedesc);
                        }
                    }).catch(function(error){
                        Toast.error('删除异常');
                    });
                }
            });
        }
    }
    //点击
    onRowClick = (record,index,element) =>{
        this.setState((prevState, props) => ({
            clickIndex: index
        }));
        this.props.clickRow(record)
    }
    getRowClassName = (record,index) =>{
        console.log('this.state.clickIndex',this.state.clickIndex)
        if(index == this.state.clickIndex){
            return 'clickRow'
        }
    }
    //分页
    handleChange(current) {
        //由于setState是异步的，所以调用刷新在回调函数里面使用
        this.setState({pageNumber:current}, function () {
            this.onRefresh()
        });
    }
    //选择
    onRowChange(ids, records) {
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
                    <Button type="primary" size="small" onClick={() => this.onEditOpen()} style={{marginBottom:'4px',marginLeft:'4px'}}>修改</Button>                
                    <Button type="primary" size="small" onClick={() => this.onDel()} style={{marginBottom:'4px',marginLeft:'4px'}}>删除</Button>                
                    <Button type="primary" size="small" onClick={() => this.onRefresh()} style={{marginBottom:'4px',marginLeft:'4px'}}>刷新</Button>                
                    <SearchTool filter={mock.filter()} search={this.search} width="120"/>
                    <Loading visible={this.state.loading} shape="fusion-reactor">
                        <CustomTable
                            dataSource={this.state.dataSource}
                            columns={mock.columns()}
                            hasBorder={false}
                            rowSelection={this.state.rowSelection}
                            onRowClick={this.onRowClick}
                            getRowClassName={this.getRowClassName}
                        />
                    </Loading>
                     <Pagination 
                        onChange={this.handleChange} 
                        shape="arrow-only"
                        pageSizeSelector="dropdown"
                        pageSizePosition="end"
                        current={+this.state.pageNumber}
                        pageSize={+this.state.pageSize}
                        total={+this.state.total}
                        onPageSizeChange={this.handlePageSizeChange}
                        style={{marginTop:'20px'}}/>
                    <EditModal ref={el => this.openEditElement = el} EditSubmit={this.EditSubmit} fields={getFields}/>
                    <AddModal ref={el => this.openAddElement = el} AddSubmit={this.AddSubmit} fields={getFields}/>
                </IceContainer>
            </div>
        );
    }
}
