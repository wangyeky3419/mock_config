import React, { Component } from 'react';
import { Dialog, Form, Input, Field, Button, Feedback, Loading } from '@icedesign/base';
const Toast = Feedback.toast;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        fixedSpan: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
export default class CreateCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading:false
        };
        this.field = new Field(this);
    }
    onCaseOpen(record){
        this.setState({
            visible:true,
            loading:false
        })
    }
    onCaseCancel(){
        this.setState({
            visible:false,
            loading:false
        })
    }
    onCaseSava(){
        console.log('保存了');
        //发送请求，回调公共组件
        this.setState({
            loading:true
        })
        let self = this;
        setTimeout(function(){
            self.setState({
                visible:false,
                loading:false
            })
            Toast.success('保存案例成功')
        }, 2000);
    }
    render() {
        const { index, record } = this.props;
        const footer = (
            <div>
                <Button type="primary" size="small" onClick={this.onCaseSava.bind(this)}>
                    保存
                </Button>
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
                    <Loading visible={this.state.loading} shape="fusion-reactor" style={{width:'100%'}}>
                        <Form direction="ver" >
                            <FormItem label='案例名称：' {...formItemLayout} key='caseName'>
                                <Input value={1}/>
                            </FormItem>
                            <FormItem label='业务意图：' {...formItemLayout} key='workIntention'>
                                <Input value={2}/>
                            </FormItem>
                            <FormItem label='预期结果：' {...formItemLayout} key='expectresult'>
                                <Input value={2}/>
                            </FormItem>
                            <FormItem label='案例描述：' {...formItemLayout} key='casedesc'>
                                <Input multiple value={2}/>
                            </FormItem>
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
