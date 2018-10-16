import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import LegalCheckTable from './components/LegalCheckTable';
import DefineSceneTable from './components/DefineSceneTable';
import DefineSceneTempTable from './components/DefineSceneTempTable';
import SceneTempTable from './components/SceneTempTable';

import TreeSearch from './components/TreeSearch';
import { Grid } from "@icedesign/base";
import './SceneManagement.scss';
const { Row, Col } = Grid;
const treeData = [
    { name: "pNode 0-0", key: "0-0",type:100},
    { name: "pNode 0-1", key: "0-1",type:200},
    { name: "pNode 0-2", key: "0-2",type:300, isLeaf: true }
]
export default class SceneManagement extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            table:''
        };
    }
    onSelect(selectedKeys,extra) {
        if(selectedKeys[0]=='0-0-0'){
            this.setState({
                table:<LegalCheckTable/>
            })
        }else if(selectedKeys[0]=='0-0-1'){
            this.setState({
                table:<DefineSceneTable/>
            })
        }else if(selectedKeys[0]=='0-0-0-0'){
            this.setState({
                table:<DefineSceneTempTable/>
            })
        }else if(selectedKeys[0]=='0-0-0-1'){
            this.setState({
                table:<SceneTempTable/>
            })
        }
    }
   
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '仿服务端场景管理', link: '#/cate/sceneManagement' },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            <Row className="demo-row">
                <Col span="4" className="demo-col-left" style={{borderTopLeftRadius: '3px',borderBottomLeftRadius: '3px'}}>
                    <TreeSearch onSelect={this.onSelect.bind(this)} treeData={treeData}/>
                </Col>
                <Col span="20" className="demo-col-inset">
                    {this.state.table}
                </Col>
            </Row>
        </div>
        );
    }
}
