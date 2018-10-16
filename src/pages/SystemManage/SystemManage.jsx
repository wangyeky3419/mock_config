import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TreeSearchLocal from '../../components/TreeSearchLocal';
import { Grid } from "@icedesign/base";
import EnvTable from "./components/EnvTable";
import SystemTable from "./components/SystemTable";
import TransTable from "./components/TransTable";
import './SystemManage.scss';
const { Row, Col } = Grid;
import * as action from '../../utils/commonFn';
let treeData = [
    {"id":"IT","name":"这个跟环境管理重复了","pId":"0","envCode":"IT","type":"env"},
    {"id":"IT_8583","name":"8583练习","pId":"IT","code":"8583","envCode":"IT","type":"system"},
    {"id":"IT_8583_1.0","name":"1.0","pId":"IT_8583","code":"1.0","envCode":"IT","type":null},
    {"id":"IT_8583_1.0_VC","name":"仿真客户端","pId":"IT_8583_1.0","code":"247","mockType":"VC","envCode":"IT","systemId":"247","type":"VC","systemCode":"8583"},
    {"id":"FT","name":"FT测试环境","pId":"0","envCode":"FT","type":"env"},
    {"id":"FT_CNP2","name":"人行二代支付系统","pId":"FT","code":"CNP2","envCode":"FT","type":"system"},
    {"id":"FT_CNP2_1.0","name":"1.0","pId":"FT_CNP2","code":"1.0","envCode":"FT","type":null},
    {"id":"FT_CNP2_1.0_VC","name":"仿真客户端","pId":"FT_CNP2_1.0","code":"382","mockType":"VC","envCode":"FT","systemId":"382","type":"VC","systemCode":"CNP2"},
]
//强制解除两个对象间关联关系，这样一个修改了，另一个就没影响
let treeDataOld = JSON.parse(JSON.stringify(treeData));
var selNode = '';
var type = '';
export default class SystemManage extends Component {
    static displayName = 'Template';
    
    constructor(props) {
        super(props);
        this.state = {
            table:'',
            text:'',
            link:''
        };
        treeData = action.toTreeData(treeData)
    }
    onSelect(selectedKeys,extra) {
         //封装的方法
         selNode = action.getSelectNode(treeDataOld,selectedKeys[0]);
         //树节点第二次点击为取消选中，这时复用上一次的type
         type = selNode ? selNode.type : type;
         console.log('type',type)
        if(type=='env'){
            //环境
            this.setState({
                table:<EnvTable/>,
                text:'环境',
                link:'#/cate/template'
            })
        }else if(type=='system'){
            //环境下的系统
            this.setState({
                table:<SystemTable/>,
                text:'系统',
                link:'#/cate/template'
            })
        }else if(type=='VC'){
            //交易
            this.setState({
                table:<TransTable/>,
                text:'交易',
                link:'#/cate/template'
            })
        }else{
            this.treeElement.expendNode(selectedKeys)
        }
    }
    render() {
        const breadcrumb = [
            { text: '这个跟环境管理重复了。。。。。。。。。。。。。。。。。。。。', link: '' },
            { text: this.state.text, link: this.state.link },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            <Row className="demo-row">
                <Col span="4" className="demo-col-left">
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
