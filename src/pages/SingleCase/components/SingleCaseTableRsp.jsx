import React, { Component } from 'react';
import { Button, Table, Select, Input } from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import DeleteBalloon from '../../../components/DeleteBalloon';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
import SearchTool from '../../../components/SearchTool';
import CellEditor from './CellEditor';

const MOCK_DATA = [
    {
        name: 'id',
        shortName: 'index',
        articleNum: 'index',
    },
    {
        name: '字段名',
        shortName: 'backEnd',
        articleNum: '3',
    },
    {
        name: '字段值',
        shortName: 'tool',
        articleNum: '10',
    },
    {
        name: '字段描述',
        shortName: 'database',
        articleNum: '26',
    },
    {
        name: '系统',
        shortName: 'system',
        articleNum: '18',
    },
    {
        name: '服务器',
        shortName: 'server',
        articleNum: '6',
    },
    {
        name: '框架',
        shortName: 'framework',
        articleNum: '39',
    },
    {
        name: '其他',
        shortName: 'other',
        articleNum: '52',
    },
];
//select临时数据
const selectSource = {
    'C':[
            {
                label:'ClASS类', 
                value:'C',
            },
            {
                label:'SQL断言', 
                value:'SQL',
            }
        ],
    'J':[
            {
                label:'JAVA片段', 
                value:'J',
            },
        ],
    'S':[
            {
                label:'原子函数', 
                value:'S',
            },
        ]
    }
export default class SingleCaseTableRsp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: MOCK_DATA,
        };
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'index',
                key: 'index',
                width: 60,
                render:(value,index)=>{
                    return index+1;
                }
            },
            {
                title: '字段名',
                dataIndex: 'name',
                key: 'name',
                width: 140,
            },
            {
                title: '字段描述',
                dataIndex: 'shortName',
                key: 'shortName',
                width: 140,
            },
            {
                title: '函数类型',
                width: 140,
                dataIndex: 'articleNum',
                key: 'articleNum',
                render:this.renderSelect.bind(this,'articleNum')
            },
            {
                title: '函数名称',
                width: 140,
                dataIndex: 'articleNum',
                key: 'articleNum',
                render:this.renderSelect.bind(this,'articleNum')
            },
            {
                title: '函数参数',
                width: 140,
                dataIndex: 'articleNum',
                key: 'articleNum',
            },
            {
                title: '字段值',
                width: 140,
                dataIndex: 'articleNum',
                key: 'articleNum',
                render:this.renderEditor.bind(this, 'name')
            }
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
        console.log(this.openElement)
    };
    //=============table内select=================
    renderSelect= (value,index) => {
        return(
            <Select dataSource={selectSource.C} hasClear/>
        )
    }
    changeDataSource = (index, valueKey, value) => {
        this.state.dataSource[index][valueKey] = value;
        this.setState({
            dataSource: this.state.dataSource,
        });
    };
    
    renderEditor = (valueKey, value, index, record) => {
        return (
            <CellEditor
                valueKey={valueKey}
                index={index}
                value={record[valueKey]}
                onChange={this.changeDataSource}
            />
        );
    };
    //==============================
    render() {
        return (
        <div>
            <IceContainer>
                <CustomTable
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    hasBorder={false}
                    isTree={true}
                />
            </IceContainer>
        </div>
        );
    }
}

  