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
export default class TempDetail extends Component {
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
                        <FormItem label='模板编码：' {...formItemLayout} key='messageCode'>
                            <Input value={this.props.record.messageCode}/>
                        </FormItem>
                        <FormItem label='模板名称：' {...formItemLayout} key='messageName'>
                            <Input value={this.props.record.messageName}/>
                        </FormItem>
                        <FormItem label='模板描述：' {...formItemLayout} key='note'>
                            <Input multiple value={this.props.record.note}/>
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
