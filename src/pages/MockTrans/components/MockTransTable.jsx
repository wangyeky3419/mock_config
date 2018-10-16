import React, { Component } from 'react';
import { Button, Pagination, Feedback, Dialog, Loading } from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
import SearchTool from '../../../components/SearchTool';
import * as mock from './mock';
import * as ajax from '../../../utils/ajax.js';
const Toast = Feedback.toast;
let getFields = [];
export default class MockTransTable extends Component {
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
        console.log(searchKey,searchValue)
        this.setState({
            searchKey:searchKey,
            searchValue:searchValue
        },function(){
            this.onRefresh()
        })
    }
    componentDidMount(){
        var data = [];
        //加载新增修改弹框所属系统选项
        ajax.getTableData('mock-config/mockTrans/getSystemSelect','')
        .then(function(response){
            data = JSON.parse(response.data.content)
            for(var i = 0; i < data.length; i++){
                data[i].label = data[i].systemName+'['+data[i].mockType+']';
                data[i].value = data[i].id;
            }
            getFields = mock.getFields(data)
        }).catch(function(error){
            getFields = mock.getFields(data)
        });
        this.onRefresh()
    }
    onRefresh = () => {
        let { rowSelection } = this.state;
        rowSelection.selectedRowKeys = [];
        this.setState({
            loading:true,
            rowSelection
        })
        let self = this;
        let params = {
            pageNumber:this.state.pageNumber,
            pageSize:this.state.pageSize,
            searchType:this.state.searchKey,
            searchText:this.state.searchValue,
            systemId:''
        }
        ajax.getTableData('/mock-config/mockTrans/getList',params)
        .then(function(response){
            var data = response.data
            self.setState({
                dataSource:data.rows,
                loading:false,
                total:data.total,
                pageSize:data.pageSize
            })
        }).catch(function(error){
            self.setState({
                loading:false,
            })
            Toast.error('请求失败');
        });
    }
    //新增弹框
    onAddOpen = () => {
        this.openAddElement.onAddOpen()
    };
    //新增提交
    AddSubmit = (values) => {
        //发送请求，回调公共组件
        let self = this;
        ajax.addTable('/mock-config/mockTrans/add',values)
        .then(function(response){
            if(response.data.state == 'success'){
                Toast.success('新增成功');
                self.onRefresh()
            }else{
                Toast.error('新增异常');
            }
        }).catch(function(error){
            Toast.error('新增失败');
        });
        this.openAddElement.AddFinish()
    }
    //编辑弹框
    onEditOpen(){
        if(this.state.selectData.length==1){
            this.openEditElement.onEditOpen(this.state.selectData[0])
        }else{
            Toast.prompt('请选择一行数据')
        }
    }
    //修改提交
    EditSubmit = (values) => {
       //发送请求，回调公共组件
       let self = this;
       ajax.editTable('/mock-config/mockTrans/update',values)
       .then(function(response){
           if(response.data.state == 'success'){
               Toast.success('修改成功');
               self.onRefresh()
           }else{
               Toast.error('修改异常');
           }
       }).catch(function(error){
           Toast.error('修改失败');
       });
       this.openEditElement.EditFinish()
    }
    //删除
    onDel = () => {
        let self = this;
        let ids = this.state.rowSelection.selectedRowKeys
        if(ids.length != 1){
            Toast.prompt("请选择一行数据");
        }else {
            //删除接口调用
            Dialog.confirm({
                content: "确定要删除吗？",
                title: "是否删除",
                onOk: () => {
                    ajax.delTable('/mock-config/mockTrans/delete',{id:ids[0]})
                    .then(function(response){
                        if(response.data.state == 'success'){
                            Toast.success('删除成功');
                            self.onRefresh()
                        }else{
                            Toast.error('删除异常');
                        }
                    }).catch(function(error){
                        Toast.error('删除失败');
                    });
                }
            });
        }
    }
    //分页
    handleChange(current) {
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
                <SearchTool filter={mock.filter()} search={this.search}/>
                <Loading visible={this.state.loading} shape="fusion-reactor">
                    <CustomTable
                        dataSource={this.state.dataSource}
                        columns={mock.columns()}
                        hasBorder={false}
                        rowSelection={this.state.rowSelection}
                    />
                </Loading>
                <Pagination 
                    onChange={this.handleChange} 
                    shape="arrow-only"
                    pageSizeSelector="dropdown"
                    pageSizePosition="end"
                    current={this.state.pageNumber}
                    pageSize={this.state.pageSize}
                    total={this.state.total}
                    onPageSizeChange={this.handlePageSizeChange}
                    style={{marginTop:'20px'}}/>
                <EditModal ref={el => this.openEditElement = el} EditSubmit={this.EditSubmit} fields={getFields}/>
                <AddModal ref={el => this.openAddElement = el} AddSubmit={this.AddSubmit} fields={getFields}/>
            </IceContainer>
        </div>
        );
    }
}
