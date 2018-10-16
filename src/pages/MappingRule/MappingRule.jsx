import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import MappingRuleTable from './components/MappingRuleTable';
import TreeSearchLocal from '../../components/TreeSearchLocal';
import { Grid } from "@icedesign/base";
import * as action from '../../utils/commonFn';
import './MappingRule.scss';
const { Row, Col } = Grid;
let treeData = [
    {"id":"CONVERT_RULE","name":"转换规则","pId":"0"},
    {"id":"BURSTIFICATION_RULE","name":"组包规则","pId":"0"},
    {"id":"ANALYTICAL_RULE","name":"解析规则","pId":"0"},
    {"id":"AFFIRM_RULE","name":"断言规则","pId":"0"},
    {"id":"SCENE_RULE","name":"场景规则","pId":"0"},
    {"id":"CHECK_RULE","name":"校验规则","pId":"0"},
    {"id":"A","name":"赋值函数","pId":"CONVERT_RULE"},
    {"id":"S","name":"原子函数","pId":"CONVERT_RULE"},
    {"id":"J","name":"JAVA片段","pId":"CONVERT_RULE"},
    {"id":"C","name":"CLASS类","pId":"CONVERT_RULE"},
    {"id":"A","name":"赋值函数","pId":"BURSTIFICATION_RULE"},
    {"id":"S","name":"原子函数","pId":"BURSTIFICATION_RULE"},
    {"id":"A","name":"赋值函数","pId":"ANALYTICAL_RULE"},
    {"id":"S","name":"原子函数","pId":"ANALYTICAL_RULE"},
    {"id":"A","name":"赋值函数","pId":"AFFIRM_RULE"},
    {"id":"J","name":"JAVA片段","pId":"AFFIRM_RULE"},
    {"id":"C","name":"CLASS类","pId":"AFFIRM_RULE"},
    {"id":"A","name":"赋值函数","pId":"SCENE_RULE"},
    {"id":"J","name":"JAVA片段","pId":"SCENE_RULE"},
    {"id":"J","name":"JAVA片段","pId":"BURSTIFICATION_RULE"},
    {"id":"C","name":"CLASS类","pId":"BURSTIFICATION_RULE"},
    {"id":"J","name":"JAVA片段","pId":"ANALYTICAL_RULE"},
    {"id":"C","name":"CLASS类","pId":"ANALYTICAL_RULE"},
    {"id":"S","name":"原子函数","pId":"AFFIRM_RULE"},
    {"id":"C","name":"CLASS类","pId":"SCENE_RULE"},
    {"id":"S","name":"原子函数","pId":"SCENE_RULE"},
    {"id":"A","name":"赋值函数","pId":"CHECK_RULE"},
    {"id":"S","name":"原子函数","pId":"CHECK_RULE"},
    {"id":"J","name":"JAVA片段","pId":"CHECK_RULE"},
    {"id":"C","name":"CLASS类","pId":"CHECK_RULE"}
]
//强制解除两个对象间关联关系，这样一个修改了，另一个就没影响
let treeDataOld = JSON.parse(JSON.stringify(treeData));
var selNode = '';
export default class MappingRule extends Component {
    
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
        console.log('selNode',selNode)
        if(selNode.pId=='0'){
            this.treeElement.expendNode(selectedKeys)
        }else{
            this.setState({
                table:<MappingRuleTable/>
            })
        }
    }
   
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '规则管理', link: '#/cate/mappingRule' },
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
