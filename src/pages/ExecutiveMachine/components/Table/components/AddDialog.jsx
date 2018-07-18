import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field } from '@icedesign/base';

const FormItem = Form.Item;

export default class AddDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
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
    this.props.reRefsh
    //   const { dataIndex } = this.state;
    //   this.props.getFormValues(dataIndex, values);
      this.toggle()
    });
  };
  toggle = () => {
    this.setState((prevState, props) => ({
        visible: !prevState.visible
      }));
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
          closable="esc,mask,close"
          onCancel={this.toggle}
          onClose={this.toggle}
          title="编辑"
        >
          <Form direction="ver" field={this.field}>
            <FormItem label="名称：" {...formItemLayout}>
              <Input
                {...init('name', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="缩写名：" {...formItemLayout}>
              <Input
                {...init('shortName', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="文章数：" {...formItemLayout}>
              <Input
                
                {...init('articleNum', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
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
