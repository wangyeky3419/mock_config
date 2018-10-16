import React, { Component } from 'react';
import { Dialog, Button, Loading, Select, Pagination, Feedback } from '@icedesign/base';
import CustomTable from '../../../components/CustomTable';
import SearchTool from '../../../components/SearchTool';
import * as mock from './mock/systemAddMock';
const Toast = Feedback.toast;
//select临时数据
const selectSource = {
    'param':[
            {
                label:'( {"overtimeTime":"11133333","CCSID":"","connMode":"","messageInterval":"","sendCommunicationDirection":"","sendQueueManager":"","sendServerIP":"","sendQueueName":"","sendServerPort":"","sendChannelName":"","receiveCommunicationDirection":"","receiveQueueManager":"","receiveServerIP":"","receiveQueueName":"","receiveServerPort":"","receiveChannelName":""})', 
                value:'300',
            },
            {
                label:'( {"httpServerURL":"111222","httpContentEncoding":"","maxThreadNumber":"","httpContentDecoding":"","httpMethod":"","specialHttpServerURL":""})', 
                value:'301',
            }
        ],
    'executorId':[
            {
                label:'执行机20180626115602,ip:192.168.100.60,port:25003', 
                value:'109',
            },
            {
                label:'执行机20180709135023,ip:192.168.100.206,port:25003', 
                value:'110',
            },
            {
                label:'执行机20180802140710,ip:192.168.99.111,port:25008', 
                value:'227',
            }
        ],
    'vsParam':[
            {
                label:'( {"httpPort":"9100","bufferMaximum":"","maxConcurrent":"","weakConnDetection":"","transmissionOptimization":"","httpEncoding":"GBK","httpContentEncoding":"GBK","httpContentDecoding":"GBK","httpURLFilter":"http://172.16.100.173:9100="})', 
                value:'138',
            },
            {
                label:'( {"httpPort":"9101","bufferMaximum":"","maxConcurrent":"","weakConnDetection":"","transmissionOptimization":"","httpEncoding":"UTF-8","httpContentEncoding":"UTF-8","httpContentDecoding":"UTF-8","httpURLFilter":"http://172.16.100.173:9101="})',
                value:'140'
            }
        ]
    }
export default class SystemAddTable extends Component {
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
        this.columns =  [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 80,
                render:(index,value,record)=>{
                    return index+1;
                }
            },
            {
                title: '系统编码',
                dataIndex: 'systemCode',
                key: 'systemCode',
                width: 150,
            },
            {
                title: '系统名称',
                dataIndex: 'systemName',
                key: 'systemName',
                width: 150,
            },
            {
                title: 'VS环境参数',
                dataIndex: 'vsParam',
                key: 'vsParam',
                width: 150,
                render:this.renderSelect.bind(this,'vsParam')
            },
            {
                title: 'VC环境参数',
                dataIndex: 'param',
                key: 'param',
                width: 150,
                render:this.renderSelect.bind(this,'param')
            },
            {
                title: '执行机',
                dataIndex: 'executorId',
                key: 'executorId',
                width: 150,
                render:this.renderSelect.bind(this,'executorId')
            }
        ];
    
    }
    
    renderSelect(key,value,index,records){
        return(
            <Select 
                dataSource={selectSource[key]} 
                hasClear 
                style={{width:100, overflow:'hidden'}} 
                autoWidth={false}
                onChange={(selNode,record)=>{
                    records[key] = selNode;
                }}
            />
        )
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
            for(var i = 0; i < submitData.length; i++){
                if(!submitData[i].vsParam){
                    Toast.prompt("请环境参数");
                    return false;
                }
            }
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
                            columns={this.columns}
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
    },
    
};
