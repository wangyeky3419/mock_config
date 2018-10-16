import React, { Component } from 'react';
import { Button, Feedback, Loading, Pagination} from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
import SearchTool from '../../../components/SearchTool';
import MappingRuleDetail from './MappingRuleDetail';
import * as action from '../../../utils/commonFn';
const Toast = Feedback.toast;
import * as mock from './mock';
let getFields = [];
export default class MappingRuleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectData:[],
            loading:false,
            rowSelection: {
                    onChange: this.onRowChange.bind(this),
                    onSelect: function(selected, record, records) {
                    },
                    onSelectAll: function(selected, records) {
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
    componentDidMount(){
        getFields = mock.getFields()
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
        this.openAddElement.onAddOpen()
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
    //提交
    onPost = () => {
        let ids = this.state.rowSelection.selectedRowKeys
        action.confirm(ids,'','提交')
    }
    //撤销
    onCancel = () => {
        let ids = this.state.rowSelection.selectedRowKeys
        action.confirm(ids,'','撤销')
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
                <Button type="primary" size="small" onClick={() => this.onEditOpen()} style={{marginBottom:'4px',marginLeft:'4px'}}>修改</Button>                
                <Button type="primary" size="small" onClick={() => this.onDel()} style={{marginBottom:'4px',marginLeft:'4px'}}>删除</Button>                
                <Button type="primary" size="small" onClick={() => this.onPost()} style={{marginBottom:'4px',marginLeft:'4px'}}>提交</Button>                
                <Button type="primary" size="small" onClick={() => this.onCancel()} style={{marginBottom:'4px',marginLeft:'4px'}}>撤销</Button>                
                <Button type="primary" size="small" onClick={() => this.onRefresh()} style={{marginBottom:'4px',marginLeft:'4px'}}>刷新</Button>                
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
                        onChange={this.handleChange} 
                        shape="arrow-only"
                        pageSizeSelector="dropdown"
                        pageSizePosition="end"
                        total={50}
                        onPageSizeChange={handlePageSizeChange}
                        style={{marginTop:'20px'}}/>
                <AddModal ref={el => this.openAddElement = el} AddSubmit={this.AddSubmit} fields={getFields}/>
                <EditModal ref={el => this.openEditElement = el} EditSubmit={this.EditSubmit} fields={getFields}/>
            </IceContainer>
        </div>
        );
    }
}
