import React, { Component } from 'react';
import { Button, Pagination, Loading} from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../../components/CustomTable';
import DeleteBalloon from '../../../../components/DeleteBalloon';
import AddModal from '../../../../components/AddModal';
import EditModal from '../../../../components/EditModal';
import SearchTool from '../../../../components/SearchTool';

import AddParamModal from '../../../../components/envParamComponent/AddParamModal';

const MOCK_DATA = [
    {
        name: '前端',
        shortName: 'frontEnd',
        articleNum: '2',
        id:'1'
    },
    {
        name: '后端',
        shortName: 'backEnd',
        articleNum: '3',
        id:'2'
    },
    {
        name: '开发工具',
        shortName: 'tool',
        articleNum: '10',
        id:'3'
    },
    {
        name: '数据库',
        shortName: 'database',
        articleNum: '26',
        id:'4'
    },
    {
        name: '系统',
        shortName: 'system',
        articleNum: '18',
        id:'5'
    },
    {
        name: '服务器',
        shortName: 'server',
        articleNum: '6',
        id:'6'
    },
    {
        name: '框架',
        shortName: 'framework',
        articleNum: '39',
        id:'7'
    },
    {
        name: '其他',
        shortName: 'other',
        articleNum: '52',
        id:'8'
    },
    {
        name: '其他',
        shortName: 'other',
        articleNum: '52',
        id:'9'
    },
    {
        name: '其他',
        shortName: 'other',
        articleNum: '52',
        id:'10'
    },
    {
        name: '其他',
        shortName: 'other',
        articleNum: '52',
        id:'11'
    }
];

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: MOCK_DATA,
            current: 2,
            loading:false,
            rowSelection: {
                        onChange: this.onChange.bind(this),
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
                title: '执行机名称',
                dataIndex: 'name',
                key: 'name',
                width: 150,
            },
            {
                title: '执行机IP',
                dataIndex: 'shortName',
                key: 'shortName',
                width: 150,
            },
            {
                title: '执行机PORT',
                width: 150,
                dataIndex: 'articleNum',
                key: 'articleNum',
            },
            {
                title: '配置中心IP',
                width: 150,
                dataIndex: 'articleNum',
                key: 'articleNum',
            },
            {
                title: '配置中心PORT',
                width: 150,
                dataIndex: 'articleNum',
                key: 'articleNum',
            },
            {
                title: '状态',
                width: 150,
                dataIndex: 'articleNum',
                key: 'articleNum',
            },
            {
                title: '心跳开关',
                width: 150,
                dataIndex: 'articleNum',
                key: 'articleNum',
            },
            {
                title: '心跳频率',
                width: 150,
                dataIndex: 'articleNum',
                key: 'articleNum',
            },
            {
                title: '最后心跳时间',
                width: 150,
                dataIndex: 'articleNum',
                key: 'articleNum',
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                render: (value, index, record) => {
                    return (
                        <span>
                        <EditModal
                            index={index}
                            record={record}
                            fields={this.getFields()}
                            EditSubmit={this.EditSubmit}
                        />
                        <DeleteBalloon
                            handleRemove={() => this.handleRemove(value, index, record)}
                        />
                        </span>
                    );
                },
            },
        ];
        //创建搜索
        this.filter = 
            [
                {label:'姓名', value:'name',key:1},
                {label:'年龄', value:'age',key:2},
                {
                    label:'性别', 
                    value:'gender',
                    key:3,
                    option:[
                        {
                            label:'男',
                            value:'1'
                        },
                        {
                            label:'女',
                            value:'0'
                        }
                    ]
                }
            ]
    }
    //搜索请求
    search = (searchField) => {
        console.log('发起搜索请求')
    }
    //创建弹框
    getFields = () => {
        return [
                {
                    name:'姓名',
                    key:'name',
                    type:'input'
                },
                {
                    name:'编码',
                    key:'shortName',
                    required:true,
                    type:'input'
                },
                {
                    name:'称呼',
                    key:'call',
                    disabled:true,
                    type:'input'
                },
                {
                    name:'年龄',
                    key:'age',
                    type:'select',
                    selectData : [
                        {label:'option1', value:'option1',key:1},
                        {label:'option2', value:'option2',key:2},
                    ]
                },
                {
                    name:'备注',
                    key:'msg',
                    type:'textarea',
                    disabled:true,
                },
                {
                    name:'日期',
                    key:'date',
                    type:'datepicker'
                }
            ]
        
    }
    
    EditSubmit = (values) => {
        console.log('修改了',values)
    }
    handleRemove = (value, index) => {
        //删除，调用删除请求
        const { dataSource } = this.state;
        dataSource.splice(index, 1);
        this.setState({
            dataSource,
        });
    };
    AddSubmit = (values) => {
        console.log('提交',values)
        //发送请求，回调公共组件
        this.openElement.AddFinish()
    }
    onOpen = () => {
        this.openElement.onAddOpen()
    };
    onChange(ids, records) {
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
    onTestVC = () => {
        this.addEnvParamElement.onAddOpen('VC')
    }
    onTestVS = () => {
        this.addEnvParamElement.onAddOpen('VS')
    }
    //测试end
    
    render() {
        const handlePageSizeChange = size => console.log(size);
        return (
        <div className="tab-table">
            <Loading visible={this.state.loading} shape="fusion-reactor">
                <IceContainer>
                    <Button type="primary" size="small" onClick={() => this.onOpen()} style={{marginBottom:'4px',marginLeft:'2px'}}>新增</Button>{' '}               
                    <Button type="primary" size="small" onClick={() => this.reRefsh()} style={{marginBottom:'4px'}}>刷新</Button>{' '}               
                    <Button type="primary" size="small" onClick={() => this.onTestVC()} style={{marginBottom:'4px'}}>测试VC</Button>{' '}                
                    <Button type="primary" size="small" onClick={() => this.onTestVS()} style={{marginBottom:'4px'}}>测试VS</Button>                
                    <SearchTool filter={this.filter} search={this.search}/>
                    <CustomTable
                        dataSource={this.state.dataSource}
                        columns={this.columns}
                        hasBorder={false}
                        rowSelection={this.state.rowSelection}
                    />
                    <Pagination 
                        current={this.state.current} 
                        onChange={this.handleChange} 
                        shape="arrow-only"
                        pageSizeSelector="dropdown"
                        pageSizePosition="end"
                        total={50}
                        onPageSizeChange={handlePageSizeChange}
                        style={{marginTop:'20px'}}/>
                    <AddModal ref={el => this.openElement = el} AddSubmit={this.AddSubmit} fields={this.getFields()}/>
                    <AddParamModal ref={el => this.addEnvParamElement = el} AddSubmit={this.AddSubmit}/>
                </IceContainer>
            </Loading>
        </div>
        );
    }
}
