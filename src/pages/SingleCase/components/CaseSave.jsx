import React, { Component } from 'react';
import { Dialog, Form, Input, Field, Button, Feedback, Loading } from '@icedesign/base';
const Toast = Feedback.toast;
import CreateCase from './CreateCase';
export default class CaseSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isSelect:''
        };
        this.field = new Field(this);
    }
    onCaseOpen(record,isSelect){
        this.setState({
            visible:true,
            isSelect:isSelect
        })
    }
    //关闭
    onCaseCancel(){
        this.setState({
            visible:false
        })
    }
    //更新案例
    onUpdata(){
        Toast.success("更新案例成功");
        this.onCaseCancel()
    }
    //创建案例
    onCreate(){
        this.onCaseCancel()
        this.createCaseElement.onCaseOpen()
    }
    render() {
        const { index, record } = this.props;
        let isSelect = this.state.isSelect;
        let footer = (
            <div>
                <Button type="primary" size="small" style={{display:isSelect?"none":""}} onClick={this.onUpdata.bind(this)}>
                    更新案例
                </Button>
                <Button type="primary" size="small" onClick={this.onCreate.bind(this)}>
                    创建案例
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
                    title="信息"
                >
                <p>1.更新案例脚本信息请点击【更新案例】按钮</p>
                <p>2.创建案例脚本信息请点击【创建案例】按钮</p>
                </Dialog>
                <CreateCase ref={el => this.createCaseElement = el}/>
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
