import React, { Component } from 'react';
import { Button, Pagination, Loading} from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import EditModal from '../../../components/EditModal';
import SearchTool from '../../../components/SearchTool';
import axios from 'axios';
import AddParamModal from '../../../components/envParamComponent/AddParamModal';
import * as mock from './mock';
import * as getUrl from '../../../utils/isService';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            current: 2,
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
                        getProps: function record(){
                            return {
                                disabled: record.id === 100306660941
                            };
                        }
                    }
        };
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }
    //刷新
    onRefresh(searchKey,searchValue){
        this.setState({
            loading:true
        })
        let self = this;
        axios({
            method:'get',
            url:getUrl.setUrl('/mock-config/executivemachine/getList'),
            params:{
                pageNumber:1,
                pageSize:10,
                searchType:searchKey||'',
                searchText:searchValue||''
            }
        
        }).then(function(response){
            self.setState({
                dataSource:response.data.rows,
                loading:false
            })
            console.log(response.data.rows)
        }).catch(function(error){
            
        });
    }
    componentDidMount(){
        this.onRefresh()
    }
    //搜索请求
    search(searchKey,searchValue){
        this.onRefresh(searchKey,searchValue);
    }
   
    setOpenRef(element){
        this.openElement = element
    }
    setParamRef(element){
        this.addEnvParamElement = element
    }
    EditSubmit(values){
        console.log('修改了',values)
    }
    handleRemove(value, index){
        //删除，调用删除请求
        const { dataSource } = this.state;
        dataSource.splice(index, 1);
        this.setState({
            dataSource,
        });
    };
    AddSubmit(values){
        console.log('提交',values)
        //发送请求，回调公共组件
        this.openElement.AddFinish()
    }
    onEditOpen(){
        // this.openElement.onAddOpen()
    };
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
    //测试top  部分代码，此处的测试指的是环境参数弹框
    onTestVC(){
        this.addEnvParamElement.onAddOpen('VC')
    }
    onTestVS(){
        this.addEnvParamElement.onAddOpen('VS')
    }
    //测试end
    handlePageSizeChange(size){
        console.log(size)
    };
    render() {
        return (
        <div className="tab-table" style={{width:'100%',overflow:'auto'}}>
            <IceContainer>
                <Button type="primary" size="small" onClick={this.onEditOpen.bind(this)} style={{marginBottom:'4px',marginLeft:'2px'}}>修改</Button>{' '}               
                <Button type="primary" size="small" onClick={this.onRefresh.bind(this,'','')} style={{marginBottom:'4px'}}>刷新</Button>{' '}               
                <Button type="primary" size="small" onClick={this.onTestVC.bind(this)} style={{marginBottom:'4px'}}>测试VC</Button>{' '}                
                <Button type="primary" size="small" onClick={this.onTestVS.bind(this)} style={{marginBottom:'4px'}}>测试VS</Button>                
                <SearchTool filter={mock.filter()} search={this.search}/>
                <Loading visible={this.state.loading} shape="fusion-reactor" style={{width:'100%'}}>
                    <CustomTable
                        dataSource={this.state.dataSource}
                        columns={mock.columns()}
                        hasBorder={false}
                        rowSelection={this.state.rowSelection}
                    />
                </Loading>
                <Pagination 
                    current={this.state.current} 
                    onChange={this.handleChange.bind(this)} 
                    shape="arrow-only"
                    pageSizeSelector="dropdown"
                    pageSizePosition="end"
                    total={50}
                    onPageSizeChange={this.handlePageSizeChange.bind(this)}
                    style={{marginTop:'20px'}}/>
                <AddParamModal ref={this.setParamRef.bind(this)} AddSubmit={this.AddSubmit.bind(this)}/>
            </IceContainer>
        </div>
        );
    }
}
