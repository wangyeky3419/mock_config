import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Select, Field, DatePicker, Loading  } from '@icedesign/base';
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
export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataIndex: null,
            loading:false
        };
        this.field = new Field(this);
    }
    handleSubmit = () => {
        this.field.validate((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            //调用父组件的方法
            this.props.AddSubmit(values)
            console.log('value',this.props)
            this.setState({
                loading:true
            })
        });
    };
    AddFinish = () => {
        this.onAddCancel()
    }
    onAddOpen = () => {
        //清空表格数据  
        this.field.remove()
        this.setState({
            visible:true,
            loading:false
        })
    }
    onAddCancel = () => {
        this.setState({
            loading:false,
            visible:false
        })
    }
    createFormItem = (fields) => {
        let component = [];
        for(const field of fields){
            switch(field.type){
                case 'input':
                component.push(this.getInputField(field)) 
                break
                case 'select':
                component.push(this.getSelectField(field)) 
                break
                case 'textarea':
                component.push(this.getTextareaField(field))
                break
                case 'datepicker':
                component.push(this.getDataPickerField(field))
                break
            }
        }
        return component
    }
    //input输入框,是否必输，是否禁用
    getInputField = (field) => {
        const init = this.field.init;
        return (
            <FormItem label={field.name+'：'} {...formItemLayout} key={field.key}>
                {
                    field.disabled?
                    <Input disabled {...init(field.key) }/>
                    :
                    <Input
                        {...init(field.key, {rules: [{ required: field.required, message: '必填选项' }]} ) }
                    />
                }
            </FormItem>)
    }
    //select选择框  必输
    getSelectField = (field) => {
        const init = this.field.init;
        return (
            <FormItem label={field.name+'：'} {...formItemLayout} key={field.key}>
                <Select {...init(field.key, { rules: [{ required: field.required, message: '必填选项' }],
                        })} dataSource={field.selectData || []} style={{width :'100%'}} hasClear={true}/>
            </FormItem>)
    }
    //textarea 是否必输，是否禁用
    getTextareaField = (field) => {
        const init = this.field.init;
        return (
            <FormItem label={field.name+'：'} {...formItemLayout} key={field.key}>
                {
                    field.disabled?
                        <Input multiple disabled
                        {...init(field.key)}
                    />
                    :
                    <Input multiple 
                        {...init(field.key, {
                            rules: [{ required: true, message: '必填选项' }],
                        })}
                    />
                }
            </FormItem>)
    }
    //datapicker  必输
    getDataPickerField = (field) => {
        const init = this.field.init;
        return (
            <FormItem label={field.name+'：'} {...formItemLayout} key={field.key}>
                <DatePicker {...init(field.key, {
                        rules: [{ required: true, message: '请选择日期' }],
                    })} 
                    style={{width :'100%'}}
                    defaultValue={new Date()}
                    />
            </FormItem>)
    }
    render() {
            // const { index, record, fields } = this.props;
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
                    <Loading visible={this.state.loading} shape="fusion-reactor" style={{width:'100%'}}>
                        <Form direction="ver" field={this.field}>
                            {this.createFormItem(this.props.fields)}
                        </Form>
                    </Loading>
                </Dialog>
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
