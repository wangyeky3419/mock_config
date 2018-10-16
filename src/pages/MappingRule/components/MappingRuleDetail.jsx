import React, { Component } from 'react';
import { Dialog, Form, Input, Field, Button } from '@icedesign/base';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        fixedSpan: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
export default class MappingRuleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.field = new Field(this);
    }
    onEditOpen(record){
        this.setState({
            visible:true,
        })
    }
    onEditCancel(){
        this.setState({
            visible:false
        })
    }
    render() {
        const { index, record } = this.props;
        const footer = (
            <div>
                <Button type="primary" size="small" onClick={this.onEditCancel.bind(this)}>
                    关闭
                </Button>
            </div>
            );
        return (
            <div style={styles.editDialog}>
                <Button
                    size="small"
                    type="primary"
                    onClick={this.onEditOpen.bind(this,index,record)}
                >
                    查看
                </Button>
                <Dialog
                    style={{ width: 640 }}
                    visible={this.state.visible}
                    closable="esc,close"
                    onCancel={this.onEditCancel.bind(this)}
                    onClose={this.onEditCancel.bind(this)}
                    footer={footer}
                    title="查看"
                >
                    <Form direction="ver" >
                        <FormItem label='规则编码：' {...formItemLayout} key='ruleCode'>
                            <Input value={this.props.record.ruleCode}/>
                        </FormItem>
                        <FormItem label='规则名称：' {...formItemLayout} key='ruleName'>
                            <Input value={this.props.record.ruleName}/>
                        </FormItem>
                        <FormItem label='返回值类型：' {...formItemLayout} key='resultType'>
                            <Input value={this.props.record.resultType}/>
                        </FormItem>
                        <FormItem label='规则描述：' {...formItemLayout} key='ruleDesc'>
                            <Input multiple value={this.props.record.ruleDesc}/>
                        </FormItem>
                        <FormItem label='规则代码：' {...formItemLayout} key='ruleRsement'>
                            <Input multiple value={this.props.record.ruleRsement}/>
                        </FormItem>
                        <FormItem label='规则DEMO：' {...formItemLayout} key='ruleDemo'>
                            <Input multiple value={this.props.record.ruleDemo}/>
                        </FormItem>
                    </Form>
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
