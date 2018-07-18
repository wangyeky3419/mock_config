import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Select, DatePicker, Loading, Field } from '@icedesign/base';
import ParamOptionModal from './ParamOptionModal';
import VsParamOptionModal from './VsParamOptionModal';
const { MonthPicker, YearPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        fixedSpan: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
export default class AddParamModal extends Component {
    static displayName = 'EnvParamModal';
  
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: '',
            receiveType:''
        };
        this.field = new Field(this);
    }
    handleSubmit = () => {
        this.field.validate((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            this.onAddCancel()
        });
    };
    onAddOpen = (receiveType) => {
        this.setState({
            visible:true,
            receiveType:receiveType
        })
    }
    onAddCancel = () => {
        this.setState({
            visible:false
        })
    }
    handleChange = (value,option) =>{
        console.log('value000',value)
        if(value != null){
            let receiveType = this.state.receiveType;
            if(receiveType=='VC'){
                //VC
                this.paramOptionElement.onAddOpen(value)
            }else if(receiveType=='VS'){
                //VS
                this.vsParamOptionElement.onAddOpen(value)
            }
        }
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
            <div style={styles.editDialog}>
                <Dialog
                    style={{ width: 640 }}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    closable="esc,close"
                    onCancel={this.onAddCancel}
                    onClose={this.onAddCancel}
                    title="新增"
                >
                    <Form direction="ver" field={this.field}>
                        <FormItem label="会计日期：" {...formItemLayout}>
                            <DatePicker {...init('accountingDate', {
                                    rules: [{ required: true, message: '请选择日期' }],
                                })} 
                                style={{width :'100%'}}
                                defaultValue={new Date()}
                            />
                        </FormItem>
                        <FormItem label="通讯类型：" {...formItemLayout}>
                            <Select style={{width :'100%'}} onChange={this.handleChange.bind(this)} hasClear={true}>
                                <Select.Option value="0">HTTP</Select.Option>
                                <Select.Option value="1">MQ</Select.Option>
                                <Select.Option value="2">SOCKET短连接</Select.Option>
                                <Select.Option value="3">SOCKET长连接</Select.Option>
                                <Select.Option value="4">UCP</Select.Option>
                                <Select.Option value="5">FCSBDSP</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem label="通讯参数：" {...formItemLayout}>
                            <Input
                            {...init('cmParas')}
                            disabled
                            />
                        </FormItem>
                    </Form>
                </Dialog>
                <ParamOptionModal ref={el => this.paramOptionElement = el} type={this.state.type}/>
                <VsParamOptionModal ref={el => this.vsParamOptionElement = el} type={this.state.type}/>
            </div>
        );
    }
}
  
const styles = {
    editDialog: {
        display: 'inline-block',
        marginRight: '5px',
    },
};
