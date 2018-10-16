import React, { Component } from 'react';
import { Dialog, Button, Loading, Select, Pagination, Feedback } from '@icedesign/base';
import CustomTable from '../../../components/CustomTable';
import SearchTool from '../../../components/SearchTool';
import * as mock from './mock/transAddMock';
const Toast = Feedback.toast;

export default class TransTableAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: [],
            loading:false,
            submitData:[],
            current:0,
            rowSelection: {
                onChange: this.onRowChange.bind(this),
                onSelect: function(selected, record, records) {
                    //获取单选数据
                    console.log("onSelect", selected, record, records);
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
    }
    componentDidMount(){
        
    }
    //保存
    handleSubmit(){
        console.log(this.state.submitData);
        let submitData = this.state.submitData;
        if(submitData.length == 0){
            Toast.prompt("请选择一行数据");
            return false;
        }else{
            this.props.AddSubmit(submitData)
            //提交
            this.setState({
                // visible:false,
                loading:true,
            })
            let self = this
            setTimeout(function(){
                self.setState({
                    visible:false,
                    loading:false,
                })
            }, 2000);
        }
    }
    onAddOpen(){
        let { rowSelection } = this.state;
        rowSelection.selectedRowKeys = [];
        this.setState({
            visible:true,
            loading:true,
            rowSelection
        })
        setTimeout(()=>{
            this.setState({
                loading:false
            })
        },1500)
    }
    onAddCancel(){
        this.setState({
            visible:false
        })
    }
    onRowChange(ids, records) {
        let { rowSelection } = this.state;
        rowSelection.selectedRowKeys = ids;
        //在此处可以调用删除接口，实现多条删除
        this.setState({ rowSelection });
        this.setState({
            submitData:records
        })
    }
    //分页
    handleChange(current) {
        this.setState({
            current
        });
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
    search = () =>{
        console.log('发起搜索请求');
        this.onRefresh()
    }
    render() {
            // const { index, record, fields } = this.props;
        const handlePageSizeChange = size => console.log(size);
        return (
            <div style={styles.addDialog}>
                <Dialog
                    style={{ width: 914 }}
                    visible={this.state.visible}
                    onOk={this.handleSubmit.bind(this)}
                    closable="esc,close"
                    onCancel={this.onAddCancel.bind(this)}
                    onClose={this.onAddCancel.bind(this)}
                    title="新增"
                >
                <SearchTool filter={mock.filter()} search={this.search} />
                    <Loading visible={this.state.loading} shape="fusion-reactor" style={{marginTop:'20px'}}>
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
                        onPageSizeChange={handlePageSizeChange}
                        style={{marginTop:'20px'}}/>
                </Dialog>
            </div>
        );
    }
}
const styles = {
    addDialog: {
        display: 'inline-block',
        marginRight: '5px',
    }
};
