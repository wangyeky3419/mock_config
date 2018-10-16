import React, { Component } from 'react';
import { Button, Table, Checkbox, Select } from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import DeleteBalloon from '../../../components/DeleteBalloon';
import AddModal from '../../../components/AddModal';
import EditModal from '../../../components/EditModal';
import SearchTool from '../../../components/SearchTool';
import CellEditor from './CellEditor';

let MOCK_DATA = [
    {"id":98958,"fieldIndex":1,"fieldLevel":"1","fieldCode":"htbh","fieldName":"字段5","fieldType":"fixed-field","parentId":0,"xpath":"htbh","fieldValue":123},
    {"id":98966,"fieldIndex":2,"fieldLevel":"2","fieldCode":"Body","fieldName":"字段2","fieldType":"nesting-field","parentId":98958,"xpath":"Envelope.Body"},
    {"id":98962,"fieldIndex":1,"fieldLevel":"1","fieldCode":"Envelope","fieldName":"字段1","fieldType":"nesting-field","parentId":0,"xpath":"Envelope"},
    {"id":98963,"fieldIndex":2,"fieldLevel":"2","fieldCode":"Body","fieldName":"字段0","fieldType":"nesting-field","parentId":98962,"xpath":"Envelope.Body"},
    {"id":98964,"fieldIndex":3,"fieldLevel":"3","fieldCode":"hetongchaxun","fieldName":"字段3","fieldType":"nesting-field","parentId":98963,"xpath":"Envelope.Body.hetongchaxun"},
    {"id":98965,"fieldIndex":4,"fieldLevel":"4","fieldCode":"jgyhbh","fieldName":"字段4","fieldType":"fixed-field","parentId":98964,"xpath":"Envelope.Body.hetongchaxun.jgyhbh"}
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
export default class SingleCaseTableReq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'index',
                key: 'index',
                width: 80,
                render:(value,index)=>{
                    return index+1;
                }
            },
            {
                title: '字段名',
                dataIndex: 'fieldCode',
                key: 'fieldCode',
                width: 140,
            },
            {
                title: '字段描述',
                dataIndex: 'fieldName',
                key: 'fieldName',
                width: 140,
            },
            {
                title: '字段值',
                width: 140,
                dataIndex: 'fieldValue',
                key: 'fieldValue',
                render:this.renderEditor.bind(this, 'fieldValue')
            },
            {
                title: '函数类型',
                width: 140,
                dataIndex: 'rTypes',
                key: 'rTypes',
                render:this.renderSelectrTypes.bind(this,'rTypes')
            },
            {
                title: '函数名称',
                width: 140,
                dataIndex: 'funCodes',
                key: 'funCodes',
                render:this.renderSelectfunCodes.bind(this,'funCodes')
            },
            {
                title: '函数参数',
                width: 140,
                dataIndex: 'params',
                key: 'params',
                render:this.renderSelectparams.bind(this,'params')
            },
            {
                title: '操作',
                key: 'action',
                width: 140,
                render: (value, index, record) => {
                    return (
                        <span>
                            <label>
                                <Checkbox id="isUseSql" name="isUseSql"/>
                                <span className="next-checkbox-label">是否使用SQL</span>
                            </label>
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
    componentDidMount(){
        this.setState({
            dataSource:this.getTreeData(MOCK_DATA)
        })
        
    }
    //数据过滤
    getTreeData(rows){
        function exists(rows, parentId){  
            for(var i=0; i<rows.length; i++){  
                if (rows[i].id == parentId) return true;  
            }  
            return false;  
        }  
        var nodes = [];  
        // 得到顶层节点
        for(var i=0; i<rows.length; i++){  
            var row = rows[i];  
            if (!exists(rows, row.parentId)){  
                nodes.push({  
                    id:row.id,  
                    fieldCode:row.fieldCode,  
                    fieldName:row.fieldName,  
                    fieldType:row.fieldType,  
                    xpath:row.xpath,
                    fieldValue:row.fieldValue
                });  
            }  
        }  
        
        var toDo = [];  
        for(var i=0; i<nodes.length; i++){  
            toDo.push(nodes[i]);  
        }  
        while(toDo.length){  
            var node = toDo.shift();    // 父节点 
            // 得到子节点 
            for(var i=0; i<rows.length; i++){  
                var row = rows[i];  
                if (row.parentId == node.id){  
                    var child = {
                        id:row.id,  
                        fieldCode:row.fieldCode,  
                        fieldName:row.fieldName,  
                        fieldType:row.fieldType,  
                        xpath:row.xpath,
                        fieldValue:row.fieldValue
                    }; 
                    if (node.children){  
                        node.children.push(child);  
                    } else {  
                        node.children = [child];  
                    }  
                    toDo.push(child);  
                }  
            }  
        }  
        return nodes;
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
    //==============================
    renderSelectrTypes= (value,index) => {
        return(
            <Select dataSource={selectSource.C} hasClear/>
        )
    }
    renderSelectfunCodes= (value,index) => {
        return(
            <Select dataSource={selectSource.C} hasClear/>
        )
    }
    renderSelectparams= (value,index) => {
        return(
            <Select dataSource={selectSource.C} hasClear/>
        )
    }

    changeDataSource = (index, valueKey, value) => {
        MOCK_DATA[index][valueKey] = value;
        this.setState({
            dataSource:this.getTreeData(MOCK_DATA)
        })
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
        <div className="tab-table">
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

  