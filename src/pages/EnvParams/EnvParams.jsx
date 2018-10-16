import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import EnvParamsTable from './components/EnvParamsTable';
import TreeSearchLocal from '../../components/TreeSearchLocal';
import * as action from '../../utils/commonFn';
import { Grid } from "@icedesign/base";
import './EnvParams.scss';
const { Row, Col } = Grid;
let treeData = [
    {"id":"root","name":"环境参数管理","pId":"0","type":null},
    {"id":"44","name":"交易银行业务枢纽","pId":"root","code":"COBP","mockType":"VC","systemId":"44","type":"system"},
    {"id":"70","name":"电子渠道对私业务处理平台","pId":"root","code":"EPBP88","mockType":"VS","systemId":"70","type":"system"},
]
//强制解除两个对象间关联关系，这样一个修改了，另一个就没影响
let treeDataOld = JSON.parse(JSON.stringify(treeData));
var selNode = '';
var type = '';
export default class EnvParams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table:''
        };
    treeData = action.toTreeData(treeData)
    }
    onSelect(selectedKeys,extra) {
        //封装的方法
        selNode = action.getSelectNode(treeDataOld,selectedKeys[0]);
        //树节点第二次点击为取消选中，这时复用上一次的type
        type = selNode ? selNode.type : type;
        console.log('selNode.mockType',selNode.mockType)
        if(type=='system'){
            this.setState({
                table:<EnvParamsTable mockType={selNode.mockType}/>
            })
        }else{
            this.treeElement.expendNode(selectedKeys)
        }
    }
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '环境参数管理', link: '#/cate/envParams' },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            <Row className="demo-row">
                <Col span="4" className="demo-col-left" style={{borderTopLeftRadius: '3px',borderBottomLeftRadius: '3px'}}>
                    <TreeSearchLocal onSelect={this.onSelect.bind(this)} ref={el => this.treeElement = el} treeData={treeData}/>
                </Col>
                <Col span="20" className="demo-col-inset">
                    {this.state.table}
                </Col>
            </Row>
        </div>
        );
    }
}
