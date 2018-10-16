import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import SingleCaseFastTable from './components/SingleCaseFastTable';
import TreeSearch from '../../components/TreeSearch';
import { Grid, Feedback } from "@icedesign/base";
import './SingleCaseFast.scss';
import * as ajax from '../../utils/ajax.js';
import * as action from '../../utils/commonFn';
const { Row, Col } = Grid;
const Toast = Feedback.toast;
var selNode = '';
var treeData = []
var treeDataOld = [];
export default class MappingRule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table:'',
            treeData:[]
        };
    }
    getTreeNode = (params) => {
        let self = this;
        ajax.getTree('/mock-server/env/tree/get',params)
        .then(function(response){
            console.log('response',response)
            treeData = JSON.parse(response.data.content)
            treeDataOld=(JSON.parse(JSON.stringify(treeData)));
            // treeData = action.toTreeData(treeData)
            if(!params){
                console.log('in')
                self.treeElement.setTreeData(treeData)
            }
            
        }).catch(function(error){
            self.treeElement.onCancel();
            Toast.error('树节点加载失败')
        });
        // ajax.getTableData('/mock-server/env/getEnvInfoList?pageNumber=1&pageSize=10')
        // .then(function(response){
           
        // }).catch(function(error){
            
        // });
    }
    componentDidMount(){
        this.getTreeNode()
    }
    onSelect = (selectedKeys,extra) => {
        console.log(treeDataOld)
        selNode = action.getSelectNode(treeDataOld,selectedKeys[0]);
        //树节点第二次点击为取消选中，这时复用上一次的type
        console.log('selNode',selNode)
        if(selectedKeys[0]=='0-0'){
            this.setState({
                table:<SingleCaseFastTable/>
            })
        }
    }
   
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '快速收发报文', link: '#/cate/SingleCaseFast' },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            <Row className="demo-row">
                <div style={{width:'16%',overflow:'auto'}} className="demo-col-left">
                    <TreeSearch onSelect={this.onSelect} ref={el => this.treeElement = el} getTreeNode={this.getTreeNode} treeData={this.state.treeData}/>
                </div>
                <div className="lineSell"><div className="line"></div></div>
                <div style={{width:'84%'}} className="demo-col-inset-1">
                    {this.state.table}
                </div>
            </Row>
        </div>
        );
    }
}
