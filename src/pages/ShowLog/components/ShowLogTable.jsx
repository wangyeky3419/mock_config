import React, { Component } from 'react';
import { Button, Pagination, DatePicker, Input, Form, Field, Grid, Select, Loading } from '@icedesign/base';

import IceContainer from '@icedesign/container';
import CustomTable from '../../../components/CustomTable';
import SearchTool from '../../../components/SearchTool';
const FormItem = Form.Item;
const { Row, Col } = Grid;

const MOCK_DATA = [
    {
        trno: '测试环境',
        rsjn: 'testCode',
        mockType: 'VC',
        messageType:'0',
        envCode:'COBP',
        systemCode:'0213',
        systemVersion:'1.0',
        transCode:'NRRO',
        transVersion:'1.0',
        timestamp:'2013-10-12'
    },
    {
        trno: '测境',
        rsjn: 'testCode',
        mockType: 'VS',
        messageType:'120',
        envCode:'COBP3',
        systemCode:'0433',
        systemVersion:'2.0',
        transCode:'NRRO2',
        transVersion:'1.0',
        timestamp:'2015-09-23'
    },
    {
        trno: '测境',
        rsjn: 'testCode',
        mockType: 'VS',
        messageType:'120',
        envCode:'COBP3',
        systemCode:'0433',
        systemVersion:'2.0',
        transCode:'NRRO2',
        transVersion:'1.0',
        timestamp:'2015-09-23'
    },
    {
        trno: '测境',
        rsjn: 'testCode',
        mockType: 'VS',
        messageType:'120',
        envCode:'COBP3',
        systemCode:'0433',
        systemVersion:'2.0',
        transCode:'NRRO2',
        transVersion:'1.0',
        timestamp:'2015-09-23'
    }
];

export default class ShowLogTable extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            dataSource: MOCK_DATA,
            startValue: '',
            endValue: '',
            endOpen: false,
            mockType:'',
            messageType:'',
            loading:false,
            timeField:{},
            envCodeOption:[],
            systemCodeOption:[],
            systemVersionOption:[],
            transCodeOption:[],
            transVersionOption:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.field = new Field(this);
        this.columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 80,
                render:function(value, index, record){
                    return index+1
                }
            },
            {
                title: '全局流水号',
                dataIndex: 'trno',
                key: 'trno',
                width: 150,
            },
            {
                title: '发起方交易流水',
                dataIndex: 'rsjn',
                key: 'rsjn',
                width: 150,
            },
            {
                title: '仿真类型',
                width: 150,
                dataIndex: 'mockType',
                key: 'mockType'
            },
            {
                title: '请求/响应',
                width: 150,
                dataIndex: 'messageType',
                key: 'messageType'
            },
            {
                title: '环境编码',
                width: 150,
                dataIndex: 'envCode',
                key: 'envCode'
            },
            {
                title: '系统编码',
                width: 150,
                dataIndex: 'systemCode',
                key: 'systemCode'
            },
            {
                title: '系统版本',
                width: 150,
                dataIndex: 'systemVersion',
                key: 'systemVersion'
            },
            {
                title: '交易码',
                width: 150,
                dataIndex: 'transCode',
                key: 'transCode'
            },
            {
                title: '交易版本',
                width: 150,
                dataIndex: 'transVersion',
                key: 'transVersion'
            },
            {
                title: '记录时间',
                width: 150,
                dataIndex: 'timestamp',
                key: 'timestamp'
            },
            {
                title: '查看',
                key: 'action',
                width: 190,
                render: function(value, index, record)  {
                    return (
                        <span>
                            <Button type="primary" size="small">报文内容</Button>
                            <Button type="primary" size="small" style={{marginLeft:'8px'}}>断言结果</Button>
                        </span>
                    );
                },
            },
        ];
    }
    componentDidMount() {
        this.setState({
            envCodeOption:[
                {label:'IT', value:'IT'},
                {label:'FT', value:'FT'},
            ]
        })
        this.onRefresh()
    }
    //分页
    handleChange(current) {
        console.log('current',current)
        this.setState({
            current
        });
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
    //datepicker   top=======================
    onChange(field, value) {
        console.log(value)
        this.setState({
            [field]: value
        });
    }
    onStartChange(value,formatDateRnage) {
        this.onChange("startValue", formatDateRnage);
    }
    onEndChange(value,formatDateRnage) {
        this.onChange("endValue", formatDateRnage);
    }
    handleStartOpenChange(open) {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }
    handleEndOpenChange(open) {
        this.setState({ endOpen: open });
    }
    onSearch(){
        let self = this;
        this.field.validate(function(errors, values){
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            //调用父组件的方法
            let startValue = self.state.startValue;
            let endValue = self.state.endValue;
            values.timeBetween = startValue+'@'+endValue
            console.log('value',values)
        });
        console.log('查询1')
    }
    handlePageSizeChange(size){
        console.log('size',size);
    }
//搜索onchange事件===top
    //仿真类型改变
    mockTypeChange(value){
        this.setState({
            mockType:value
        })
    }
    //请求响应
    messageTypeChange(value){
        this.setState({
            messageType:value
        })
    }
    //环境编码
    envCodeChange(value){
        //获取系统编码数据
        this.setState({
            systemCodeOption:[
                {label:'系统1', value:'01'},
                {label:'系统2', value:'02'},
            ]
        })
    }
    //系统编码
    systemCodeChange(value){
        this.setState({
            systemVersionOption:[
                {label:'1.0', value:'01'},
                {label:'2.0', value:'02'},
            ]
        })
    }
    //系统版本
    systemVersionChange(value){
        this.setState({
            transCodeOption:[
                {label:'107001', value:'107001'},
                {label:'108002', value:'108002'},
            ]
        })
    }
    //交易码
    transCodeChange(value){
        this.setState({
            transVersionOption:[
                {label:'x1', value:'x1'},
                {label:'x2', value:'x2'},
            ]
        })
    }
//搜索onchange事件===end
    //datepicker   end=======================
    render() {
        const { startValue, endValue, endOpen } = this.state;
        const init = this.field.init;
        return (
            <div className="tab-table">
                <IceContainer style={{paddingBottom:'0'}}>
                    <Form field={this.field} >
                        <Row wrap>
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <FormItem label="开始时间：">
                                    <DatePicker
                                        style={{minWidth:'180px'}}
                                        showTime
                                        value={startValue}
                                        placeholder="Start"
                                        onChange={this.onStartChange.bind(this)}
                                        onOpenChange={this.handleStartOpenChange.bind(this)}
                                    />
                                    
                                </FormItem>
                            </Col>
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <FormItem label="结束时间：">
                                    <DatePicker
                                        style={{minWidth:'180px'}}
                                        showTime
                                        value={endValue}
                                        placeholder="End"
                                        onChange={this.onEndChange.bind(this)}
                                        open={endOpen}
                                        onOpenChange={this.handleEndOpenChange.bind(this)}
                                    />
                                </FormItem>
                            </Col>
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <FormItem label="全局流水号：" style={{marginLeft:'-14px',marginRight:'14px'}}>
                                    <Input {...init('trno')} style={{width:'180px'}} hasClear={true}/>
                                </FormItem>
                            </Col>
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <FormItem label="发起方流水：" style={{marginLeft:'-14px'}}>
                                    <Input {...init('rsjn')} style={{width:'180px'}} hasClear={true}/>
                                </FormItem>
                            </Col>
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <FormItem label="仿真类型：">
                                    <Select {...init('mockType')} style={{width:'180px'}} onChange={this.mockTypeChange.bind(this)} value={this.state.mockType} hasClear={true}>
                                        <Select.Option value="">全部</Select.Option>
                                        <Select.Option value="VC">VC</Select.Option>
                                        <Select.Option value="VS">VS</Select.Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <FormItem label="请求响应：">
                                    <Select {...init('messageType')} style={{width:'180px'}} onChange={this.messageTypeChange.bind(this)} value={this.state.messageType} hasClear={true}>
                                        <Select.Option value="">全部</Select.Option>
                                        <Select.Option value="REQ">REQ</Select.Option>
                                        <Select.Option value="RSP">RSP</Select.Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <FormItem label="环境编码：">
                                    <Select {...init('envCode')} style={{width:'180px'}} dataSource={this.state.envCodeOption} onChange={this.envCodeChange.bind(this)} hasClear={true}>
                                        
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <FormItem label="系统编码：">
                                    <Select {...init('systemCode')} style={{width:'180px'}} dataSource={this.state.systemCodeOption} onChange={this.systemCodeChange.bind(this)} hasClear={true}>
                                        
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <FormItem label="系统版本：">
                                    <Select {...init('systemVersion')} style={{width:'180px'}} dataSource={this.state.systemVersionOption} onChange={this.systemVersionChange.bind(this)} hasClear={true}>
                                        
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <FormItem label="&nbsp;&nbsp;&nbsp;&nbsp;交易码：">
                                    <Select {...init('transCode')} style={{width:'180px'}} dataSource={this.state.transCodeOption} onChange={this.transCodeChange.bind(this)} hasClear={true}>
                                        
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <FormItem label="交易模板版本：" style={{marginLeft:'-28px'}}>
                                    <Select {...init('transVersion')} style={{width:'180px'}} dataSource={this.state.transVersionOption} hasClear={true}>
                                        
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xl={6} l={8} s={12} xxs={24}>
                                <Button type="primary" size="small" onClick={this.onSearch.bind(this)} style={{marginLeft:'78px'}}>查询</Button>
                                <Button type="primary" size="small" onClick={this.onRefresh.bind(this)} style={{marginLeft:'4px'}}>刷新</Button>
                            </Col>
                        </Row>
                    </Form>
                </IceContainer>
                <IceContainer>
                    <Loading visible={this.state.loading} shape="fusion-reactor" style={{width:'100%'}}>
                        <CustomTable
                            dataSource={this.state.dataSource}
                            columns={this.columns}
                            hasBorder={false}
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
                </IceContainer>
            </div>
        );
    }
}
