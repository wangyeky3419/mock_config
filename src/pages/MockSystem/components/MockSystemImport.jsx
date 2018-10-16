import React, { Component } from 'react';
import { Dialog, Button, Loading } from '@icedesign/base';
import CustomTable from '../../../components/CustomTable';
const MOCK_DATA = [
    {
        systemCode:'code001',
        systemName:'编码001',
        id:10
    },
    {
        systemCode:'code211',
        systemName:'编码211',
        id:11
    }
]
export default class MockSystemImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: MOCK_DATA,
            loading:false,
            submitData:[],
            rowSelection: {
                onChange: this.onRowChange.bind(this),
                onSelect: function(selected, record, records) {
                    //获取单选数据
                    console.log("onSelect", selected, record, records);
                },
                onSelectAll: function(selected, records) {
                    //获取全选数据
                    console.log("onSelectAll", selected, records);
                },
                selectedRowKeys: [],
                getProps: record => {
                    return {
                        disabled: record.id === 100306660941
                    };
                }
            }
        };
        this.columns = [
            {
                title: '系统编码',
                dataIndex: 'systemCode',
                key: 'systemCode',
                width: 150,
            },
            {
                title: '系统名称',
                dataIndex: 'systemName',
                key: 'systemName',
                width: 150,
            }
        ]
    }
    //导入
    handleSubmit(){
        console.log(this.state.submitData)
        this.setState({
            // visible:false,
            loading:true,
        })
        let self = this
        setTimeout(function(){
            self.setState({
                visible:false,
                loading:false,
            })
        }, 2000);

    }
    importFinish(){
        this.onAddCancel()
    }
    onImportOpen(){
        let { rowSelection } = this.state;
        rowSelection.selectedRowKeys = [];
        this.setState({
            visible:true,
            loading:false,
            rowSelection
        })
    }
    onImportCancel(){
        this.setState({
            visible:false
        })
    }
    onRowChange(ids, records) {
        let { rowSelection } = this.state;
        rowSelection.selectedRowKeys = ids;
        //在此处可以调用删除接口，实现多条删除
        this.setState({ rowSelection });
        this.setState({
            submitData:records
        })
    }
    render() {
            // const { index, record, fields } = this.props;
        const footer = (
            <div>
                <Button type="primary" size="small" onClick={this.handleSubmit.bind(this)}>
                    导入
                </Button>
                <Button type="primary" size="small" onClick={this.onImportCancel.bind(this)}>
                    取消
                </Button>
            </div>
            );
        return (
            <div style={styles.importDialog}>
                <Dialog
                    style={{ width: 640 }}
                    visible={this.state.visible}
                    onOk={this.handleSubmit.bind(this)}
                    closable="esc,close"
                    onCancel={this.onImportCancel.bind(this)}
                    onClose={this.onImportCancel.bind(this)}
                    title="导入"
                    footer={footer}
                >
                    <Loading visible={this.state.loading} shape="fusion-reactor">
                        <CustomTable
                            dataSource={this.state.dataSource}
                            columns={this.columns}
                            hasBorder={false}
                            rowSelection={this.state.rowSelection}
                        />
                    </Loading>
                </Dialog>
            </div>
        );
    }
}
const styles = {
    importDialog: {
        display: 'inline-block',
        marginRight: '5px',
    },
    
};
