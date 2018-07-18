import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Select, DatePicker, Loading, Field, Grid, Table } from '@icedesign/base';
import IceContainer from '@icedesign/container';

const { MonthPicker, YearPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Row, Col } = Grid;
const formItemLayout = {
    labelCol: {
        fixedSpan: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
export default class VsParamOptionModal extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource:[],
            type:'',
            sortType : '',
            lenType:'',
            fcsType:'',

        };
        this.field = new Field(this);
    }
    handleSubmit = () => {
        this.field.validate((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('values',values)
            this.onAddCancel()
        });
    };
    onAddValue = () => {
        //添加按钮的点击事件
        let valueType = this.field.getValue('valueType')
        let dataType = this.field.getValue('dataType')
        let dataEncoding = this.field.getValue('dataEncoding')
        let characterEncoding = this.field.getValue('characterEncoding')
        let value = this.field.getValue('value')
        let addValue = {};
        addValue = {
            valueType:valueType,
            dataType:dataType,
            characterEncoding:characterEncoding,
            dataEncoding:dataEncoding,
            value:value,
            label:value
        }
        let temp = this.state.dataSource;
        console.log('temp',temp)
        temp.push(addValue);
        this.setState({
            dataSource:temp
        })
    }
    onAddOpen = (type) => {
        this.field.remove()
        this.setState({
            visible:true,
            type:type,
            sortType:'',
            lenType:'',
            fcsType:''
        })
    }
    onAddCancel = () => {
        this.setState({
            visible:false
        })
    }
    //SOCKET短连接解码类型改变
    handleSortChange = (value,option) => {
        this.setState({
            sortType:value
        })
    }
    //SOCKET长连接解码类型改变
    handleLenChange = (value,option) => {
        this.setState({
            lenType:value
        })
    }
    //FCSBDSP解码类型改变
    handleFcsChange = (value,option) => {
        this.setState({
            fcsType:value
        })
    }
    createFormItem = (type) => {
        let component = null;
        switch(type){
            case '0':
            component = this.getHttpField()
            break
            case '1':
            component = this.getMqField()
            break
            case '2':
            component = this.getSocketSortField()
            break
            case '3':
            component = this.getSocketLenField()
            break
            case '5':
            component = this.getFcsbdspField()
            break
        }
        return component
    }
    //创建HTTP
    getHttpField = () => {
        const init = this.field.init;
        return(
            <div>
                <span style={styles.addTitle}>基本参数：</span>
                <hr/>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="服务端口：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('httpServerURL')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="超时时间：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('httpServerURL')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="缓冲区最大值：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('maxThreadNumber')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="最大并发数：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('maxThreadNumber')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="延迟时间：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('maxThreadNumber')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="弱连接检测：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                    {...init('codecType')} 
                                    hasClear={true}
                                    onChange={this.handleSortChange.bind(this)}
                                >
                                <Select.Option value="true">是</Select.Option>
                                <Select.Option value="false">否</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="传输效率优化：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                    {...init('codecType')} 
                                    hasClear={true}
                                    onChange={this.handleSortChange.bind(this)}
                                >
                                <Select.Option value="true">是</Select.Option>
                                <Select.Option value="false">否</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="Http元素编码格式：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                    {...init('codecType')} 
                                    hasClear={true}
                                    onChange={this.handleSortChange.bind(this)}
                                >
                                <Select.Option value="UTF-8">UTF-8</Select.Option>
                                <Select.Option value="GBK">GBK</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="传输内容编码格式：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                    {...init('codecType')} 
                                    hasClear={true}
                                    onChange={this.handleSortChange.bind(this)}
                                >
                                <Select.Option value="UTF-8">UTF-8</Select.Option>
                                <Select.Option value="GBK">GBK</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="传输内容解码格式：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                    {...init('codecType')} 
                                    hasClear={true}
                                    onChange={this.handleSortChange.bind(this)}
                                >
                                <Select.Option value="UTF-8">UTF-8</Select.Option>
                                <Select.Option value="GBK">GBK</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="24">
                        <FormItem label="URL过滤：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input multiple {...init('specialHttpServerURL')} style={{width:'113%'}}/>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
    //创建MQ
    getMqField = () => {
        const init = this.field.init;
        return(
            <div>
                <span style={styles.addTitle}>基本参数：</span>
                <hr/>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="超时时间：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('overtimeTime')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="CCSID：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('CCSID')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="连接模式：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('connMode')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="消息间隔：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('messageInterval')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <span style={styles.addTitle}>发送报文队列：</span>
                <hr/>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="通讯方向：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('sendCommunicationDirection')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="队列管理器：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('sendQueueManager')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="服务器地址：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('sendServerIP')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="队列名称：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('sendQueueName')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="服务器端口：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('sendServerPort')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="通道名称：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('sendChannelName')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <span style={styles.addTitle}>接收报文队列：</span>
                <hr/>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="通讯方向：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('receiveCommunicationDirection')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="队列管理器：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('receiveQueueManager')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="服务器地址：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('receiveServerIP')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="队列名称：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('receiveQueueName')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="服务器端口：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('receiveServerPort')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="通道名称：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('receiveChannelName')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
    //创建SOCKET短连接
    getSocketSortField = () => {
        const init = this.field.init;
        return(
            <div>
                <span style={styles.addTitle}>基本参数：</span>
                <hr/>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="IP：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('ip')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="PORT：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('port')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="最大连接数：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('ip')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="监听端口：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('port')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="缓冲区最大值：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('bufferMaximum')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="延时时间：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('bufferMaximum')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="解码类型：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('codecType')} 
                                hasClear={true}
                                onChange={this.handleSortChange.bind(this)}
                            >
                                <Select.Option value="length">长度截取（缺省值）</Select.Option>
                                <Select.Option value="delimiter">分隔符截取</Select.Option>
                                <Select.Option value="diy">自定义截取</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                {/* 长度截取 */}
                <div style={{display:this.state.sortType=='length'?'block':'none'}}>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="12">
                            <FormItem label="存储格式：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Select style={{width :'70%'}} {...init('lengthCodeType')} hasClear={true}>
                                    <Select.Option value="STR">按字符串存储为字节（缺省值）</Select.Option>
                                    <Select.Option value="INT">数字直接存储为字节</Select.Option>
                                    <Select.Option value="BCD">将字符串压缩为BCD码</Select.Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="占位长度：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('lengthFieldLength')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="首字节偏移量：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('lengthFieldOffset')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="最大缓冲区最大值：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} {...init('lengthIncludesLengthFieldLength')} hasClear={true}>
                                <Select.Option value="false">不包含（缺省值）</Select.Option>
                                <Select.Option value="true">包含</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                    </Row>
                </div>
                {/* 分隔符截取 */}
                <div style={{display:this.state.sortType=='delimiter'?'block':'none'}}>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="12">
                            <FormItem label="报文最大长度：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('maxLength')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="起始符：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('startBuf')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="12">
                            <FormItem label="结束符：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('endBuf')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="报文是否包含分隔符：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Select style={{width :'70%'}} {...init('stripDelimiter')} hasClear={true}>
                                    <Select.Option value="false">不包含</Select.Option>
                                    <Select.Option value="true">包含</Select.Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                {/* 自定义截取 */}
                <div style={{display:this.state.sortType=='diy'?'block':'none'}}>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="24">
                            <FormItem label="解码器class路径：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('decoderClassName')} style={{width:'108%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="24">
                            <FormItem label="编码器class路径：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('encoderClassName')} style={{width:'108%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
    //创建SOCKET长连接
    getSocketLenField = () => {
        const init = this.field.init;
        return (
            <div>
                <span style={styles.addTitle}>基本参数：</span>
                <hr/>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="解码类型：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('codecType')} 
                                hasClear={true}
                                onChange={this.handleLenChange.bind(this)}
                            >
                                <Select.Option value="length">长度截取（缺省值）</Select.Option>
                                <Select.Option value="delimiter">分隔符截取</Select.Option>
                                <Select.Option value="diy">自定义截取</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                {/* 长度截取 */}
                <div style={{display:this.state.lenType=='length'?'block':'none'}}>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="12">
                            <FormItem label="存储格式：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Select style={{width :'70%'}} 
                                    {...init('lengthCodeType')} 
                                    hasClear={true}
                                >
                                    <Select.Option value="STR">按字符串存储为字节（缺省值）</Select.Option>
                                    <Select.Option value="INT">数字直接存储为字节</Select.Option>
                                    <Select.Option value="BCD">将字符串压缩为BCD码</Select.Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="占位长度：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('lengthFieldLength')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="12">
                            <FormItem label="首字节偏移量：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('lengthFieldOffset')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="缓冲区最大值：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Select style={{width :'70%'}} 
                                    {...init('lengthIncludesLengthFieldLength')} 
                                    hasClear={true}
                                >
                                    <Select.Option value="false">不包含（缺省值）</Select.Option>
                                    <Select.Option value="true">包含</Select.Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                {/* 分隔符截取 */}
                <div style={{display:this.state.lenType=='delimiter'?'block':'none'}}>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="12">
                            <FormItem label="报文最大长度：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('maxLength')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="起始符：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('startBuf')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="12">
                            <FormItem label="结束符：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('endBuf')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="报文是否包含分隔符：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Select style={{width :'70%'}} 
                                    {...init('stripDelimiter')} 
                                    hasClear={true}
                                >
                                    <Select.Option value="false">不包含</Select.Option>
                                    <Select.Option value="true">包含</Select.Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                {/* 自定义截取 */}
                <div style={{display:this.state.lenType=='diy'?'block':'none'}}>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="24">
                            <FormItem label="解码器class路径：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('decoderClassName')} style={{width:'108%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="24">
                            <FormItem label="编码器class路径：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('encoderClassName')} style={{width:'108%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <span style={styles.addTitle}>连接信息：</span>
                <hr/>
                <div style={styles.addTitle2}>
                    <span>SOCKET1：</span>
                    <hr/>
                </div>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="连接类型：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('serverConnType')} 
                                hasClear={true}
                            >
                                <Select.Option value="server">服务端</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="通讯方向：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('receiveCommunicationDirection')} 
                                hasClear={true}
                            >
                                <Select.Option value="receive">接收</Select.Option>
                                <Select.Option value="send">发送</Select.Option>
                                <Select.Option value="bothway">双向</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="服务器端口：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('receiveServerPort')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <div style={styles.addTitle2}>
                    <span>SOCKET2：</span>
                    <hr/>
                </div>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="连接类型：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('clientConnType')} 
                                hasClear={true}
                            >
                                <Select.Option value="clent">客户端</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="通讯方向：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('sendCommunicationDirection')} 
                                hasClear={true}
                            >
                                <Select.Option value="receive">接收</Select.Option>
                                <Select.Option value="send">发送</Select.Option>
                                <Select.Option value="bothway">双向</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="服务器地址：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('sendServerIP')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="服务器端口：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('sendServerPort')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="网卡地址：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('netcard')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="固定端口：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('fixedPort')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>

                <span style={styles.addTitle}>心跳包信息：</span>
                <hr/>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="取值类型：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('valueType')} 
                                hasClear={true}
                            >
                                <Select.Option value="direct">直接取值</Select.Option>
                                <Select.Option value="script">用脚本计算</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="数据类型：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('dataType')} 
                                hasClear={true}
                            >
                                <Select.Option value="string">string</Select.Option>
                                <Select.Option value="int">int</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="数据编码：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('dataEncoding')} 
                                hasClear={true}
                            >
                                <Select.Option value="ASC">ASC码</Select.Option>
                                <Select.Option value="BCD">BCD码</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="字符集：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('characterEncoding')} 
                                hasClear={true}
                            >
                                <Select.Option value="GBK">GBK</Select.Option>
                                <Select.Option value="UTF-8">UTF-8</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="心跳包数据：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('value')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <Button type="normal" size="small" style={{marginLeft:'130px'}} onClick={() => this.onAddValue()}>添加</Button>
                    </Col>
                </Row>
                <Table dataSource={this.state.dataSource}>
                    <Table.Column title="取值类型" dataIndex="valueType"/>
                    <Table.Column title="数据类型" dataIndex="dataType"/>
                    <Table.Column title="字符集" dataIndex="characterEncoding"/>
                    <Table.Column title="字符集" dataIndex="dataEncoding"/>
                    <Table.Column title="心跳包数据" dataIndex="value"/>
                </Table>
                <br/>
                <div style={styles.addTitle2}>
                    <span>心跳SOCKET1：</span>
                    <hr/>
                </div>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="传输方向：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('receiveTransmissionDirection')} 
                                hasClear={true}
                            >
                                <Select.Option value="receive">接收</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="接收间隔：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('receiveInterval')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="接收内容：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('receiveMessage')} 
                                hasClear={true}
                                dataSource={this.state.dataSource}
                            >
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="回应内容：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                    {...init('responseMessage')} 
                                    hasClear={true}
                                    dataSource={this.state.dataSource}
                                >
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <div style={styles.addTitle2}>
                    <span>心跳SOCKET2：</span>
                    <hr/>
                </div>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="传输方向：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('sendTransmissionDirection')} 
                                hasClear={true}
                            >
                                <Select.Option value="send">发送</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="发送间隔：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('sendInterval')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                    <Col span="12">
                        <FormItem label="发送内容：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('sendMessage')} 
                                hasClear={true}
                            >
                                <Select.Option value="12">12</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="应答内容：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                    {...init('answerMessage')} 
                                    hasClear={true}
                                >
                                <Select.Option value="21">21</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
    //创建FCSBDSP
    getFcsbdspField = () => {
        const init = this.field.init;
        return (
            <div>
                <span style={styles.addTitle}>基本参数：</span>
                <hr/>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="IP：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('ip')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="PORT：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('port')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="缓冲区最大值：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('bufferMaximum')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="解码类型：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Select style={{width :'70%'}} 
                                {...init('codecType')} 
                                hasClear={true}
                                onChange={this.handleFcsChange.bind(this)}
                            >
                                <Select.Option value="length">长度截取（缺省值）</Select.Option>
                                <Select.Option value="delimiter">分隔符截取</Select.Option>
                                <Select.Option value="diy">自定义截取</Select.Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="客户端ip：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('clientIP')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="客户端port：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('clientPort')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{marginLeft:'-10px'}}>
                    <Col span="12">
                        <FormItem label="客户端ip：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                            <Input {...init('sourceNodeCode')} style={{width:'70%'}}/>
                        </FormItem>
                    </Col>
                </Row>
                {/* 长度截取 */}
                <div style={{display:this.state.fcsType=='length'?'block':'none'}}>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="12">
                            <FormItem label="存储格式：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Select style={{width :'70%'}} 
                                    {...init('lengthCodeType')} 
                                    hasClear={true}
                                >
                                    <Select.Option value="STR">按字符串存储为字节（缺省值）</Select.Option>
                                    <Select.Option value="INT">数字直接存储为字节</Select.Option>
                                    <Select.Option value="BCD">将字符串压缩为BCD码</Select.Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="占位长度：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('lengthFieldLength')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="12">
                            <FormItem label="首字节偏移量：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('lengthFieldOffset')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="缓冲区最大值：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Select style={{width :'70%'}} 
                                    {...init('lengthIncludesLengthFieldLength')} 
                                    hasClear={true}
                                >
                                    <Select.Option value="false">不包含（缺省值）</Select.Option>
                                    <Select.Option value="true">包含</Select.Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                {/* 分隔符截取 */}
                <div style={{display:this.state.fcsType=='delimiter'?'block':'none'}}>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="12">
                            <FormItem label="报文最大长度：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('maxLength')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="起始符：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('startBuf')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="12">
                            <FormItem label="结束符：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('endBuf')} style={{width:'70%'}}/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="报文是否包含分隔符：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Select style={{width :'70%'}} {...init('stripDelimiter')} hasClear={true}>
                                    <Select.Option value="false">不包含</Select.Option>
                                    <Select.Option value="true">包含</Select.Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                {/* 自定义截取 */}
                <div style={{display:this.state.fcsType=='diy'?'block':'none'}}>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="24">
                            <FormItem label="解码器class路径：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('decoderClassName')} style={{width:'108%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{marginLeft:'-10px',marginTop:'10px'}}>
                        <Col span="24">
                            <FormItem label="编码器class路径：" {...formItemLayout} style={{marginLeft:'-30px'}}>
                                <Input {...init('encoderClassName')} style={{width:'108%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
    render() {
        const init = this.field.init;
        const { index, record } = this.props;
        const formItemLayout = {
            labelCol: {
                fixedSpan: 6,
            },
            wrapperCol: {
                span: 14,
            },
        };
  
        return (
            <div style={styles.addDialog}>
                <Dialog
                    style={{ width: 640 }}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    closable="esc,close"
                    onCancel={this.onAddCancel}
                    onClose={this.onAddCancel}
                    title="通讯参数"
                >
                    <Form direction="ver">
                        {this.createFormItem(this.state.type)}
                    </Form>
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
    addTitle: {
        color:'#2077FF',
        margin:'0',
        fontFamily:'Roboto, "Helvetica Neue", Helvetica, Tahoma, Arial, FZLanTingHeiS-L-G, "PingFang SC", "Microsoft YaHei"'
    },
    addTitle2: {
        color:'#666',
        paddingLeft:'16px',
        paddingRight:'16px',
        fontFamily:'Roboto, "Helvetica Neue", Helvetica, Tahoma, Arial, FZLanTingHeiS-L-G, "PingFang SC", "Microsoft YaHei"'
    }
};
