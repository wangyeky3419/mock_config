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
export default class CaseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.field = new Field(this);
    }
    onCaseOpen(record){
        this.setState({
            visible:true,
        })
    }
    onCaseCancel(){
        this.setState({
            visible:false
        })
    }
    render() {
        const { index, record } = this.props;
        const footer = (
            <div>
                <Button type="primary" size="small" onClick={this.onCaseCancel.bind(this)}>
                    关闭
                </Button>
            </div>
            );
        return (
            <div style={styles.editDialog}>
                <Dialog
                    style={{ width: 640 }}
                    visible={this.state.visible}
                    closable="esc,close"
                    onCancel={this.onCaseCancel.bind(this)}
                    onClose={this.onCaseCancel.bind(this)}
                    footer={footer}
                    title="案例详情"
                >
                    <Form direction="ver" >
                        <FormItem label='案例名称：' {...formItemLayout} key='caseName'>
                            <Input value={1}/>
                        </FormItem>
                        <FormItem label='业务意图：' {...formItemLayout} key='workIntention'>
                            <Input value={2}/>
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
