import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TreeSearchLocal from '../../components/TreeSearchLocal';
import TablePublic from './components/TablePublic';
import TableTrans from './components/TableTrans';
import VersionTable from './components/VersionTable';
import PublicTempTable from './components/PublicTempTable';
import TransTempTable from './components/TransTempTable';
import TransTempList from './components/TransTempList';
import { Grid } from "@icedesign/base";
import * as action from '../../utils/commonFn';
import './Template.scss';
import axios from 'axios';
// const axios = require('axios');
const { Row, Col } = Grid;
let treeData = [
    {"id":"COBP","name":"交易银行业务枢纽","pId":null,"code":"COBP","type":"system","isLeaf":false},
    {"id":"441","name":"VC","pId":"COBP","code":"44","systemId":"44","type":"VC","isLeaf":false},
    {"id":"44_common","name":"公共模板","pId":"441","type":"VC_public","isLeaf":false},
    {"id":"44_common_CS","name":"演示使用","pId":"44_common","code":"CS","systemId":"44","messageCode":"CS","type":"VC_fragment","isLeaf":false},
    {"id":"44","name":"1.0","pId":"44_common_CS","code":"1.0","systemId":"44","messageCode":"CS","type":"fragmentVersion","version":"1.0","isLeaf":true},
    {"id":"45_VC","name":"交易模板","pId":"441","type":"VC_trans_parent","isLeaf":false},
    {"id":"44_1007003","name":"附属账户体系查询","pId":"45_VC","code":"1007003","systemId":"44","transCode":"1007003","type":"VC_trans","isLeaf":false},
    {"id":"44_1007003_1.0","name":"1.0","pId":"44_1007003","code":"359","mockType":"VC","systemId":"44","transCode":"1007003","type":"VC_transVersion","version":"1.0","systemCode":"COBP","isLeaf":true},
    {"id":"44_1007003_1.1","name":"1.1","pId":"44_1007003","code":"708","mockType":"VC","systemId":"44","transCode":"1007003","type":"VC_transVersion","version":"1.1","systemCode":"COBP","isLeaf":true},
    {"id":"101","name":"VS","pId":"COBP","code":"101","systemId":"101","type":"VS","isLeaf":false},
    {"id":"101_VS","name":"公共模板","pId":"101","type":"VS_public","isLeaf":false},
    {"id":"109","name":"测试Jason","pId":"101_VS","code":"1.0","systemId":"107","messageCode":"master","type":"VS_master","isLeaf":false},
    {"id":"117","name":"1.0","pId":"109","code":"1.0","systemId":"107","messageCode":"master","type":"masterVersion","version":"1.0","isLeaf":true},
    {"id":"102_VS","name":"交易模板","pId":"101","type":"VS_trans_parent","isLeaf":false},
    {"id":"101_1007001","name":"附属账户体系建立","pId":"102_VS","code":"1007001","systemId":"101","transCode":"1007001","type":"VS_trans","isLeaf":false},
    {"id":"101_1007001_1.0","name":"1.0","pId":"101_1007001","code":"388","mockType":"VS","systemId":"101","transCode":"1007001","type":"VS_transVersion","version":"1.0","systemCode":"COBP","isLeaf":false},
    {"id":"1255","name":"附属账户体系建立","pId":"101_1007001_1.0","code":"1007001","systemId":"101","transCode":"1007001","messageCode":"1007001","type":"VS_reponse","version":"1.0","isLeaf":true,"isscene":"0","sceneType":"0","messageIo":"O","istermcheck":"0","isdefmodel":"1"},
    {"id":"2672","name":"附属账户体系建立","pId":"101_1007001_1.0","code":"1007001","systemId":"101","transCode":"1007001","messageCode":"1007001","type":"VS_reponse","version":"1.0","isLeaf":true,"isscene":"0","sceneType":"3","messageIo":"O","istermcheck":"1","isdefmodel":"0"},
]
//强制解除两个对象间关联关系，这样一个修改了，另一个就没影响
let treeDataOld = JSON.parse(JSON.stringify(treeData));
var selNode = '';
var type = '';
export default class Template extends Component {
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
    componentDidMount(){
        //树节点请求
        // axios({
        //     method:'get',
        //     url:'/api/mock-config/sceneManagement/scene/getSystemNode',
        // }).then(function(response){
        //     console.log('response',response);
        // }).catch(function(error){
        //     console.log(2,error);
        // });
    }
    onSelect(selectedKeys,extra) {
        //封装的方法
        selNode = action.getSelectNode(treeDataOld,selectedKeys[0]);
        //树节点第二次点击为取消选中，这时复用上一次的type
        type = selNode ? selNode.type : type;
        console.log('type',type)
        if(type=='VC_public'||type=='VS_public'){
            //VC/VS下的公共模板
            this.setState({
                table:<TablePublic/>,
                text:'公共模板',
                link:'#/cate/template'
            })
        }else if(type=='system'||type=='VC'||type=='VS'||type=='VS_trans'||type=='VS_master'){
            this.treeElement.expendNode(selectedKeys)
        }else if(type=='VS_trans_parent'||type=='VC_trans_parent'){
            //VC/VS下的交易模板
            this.setState({
                table:<TableTrans/>,
                text:'交易模板',
                link:'#/cate/template'
            })
        }else if(type=='VC_fragment'||type=='VC_trans'){
            //版本
            this.setState({
                table:<VersionTable/>,
                text:'版本号',
                link:'#/cate/template'
            })
        }else if(type=='fragmentVersion'){
            //VC下的公共模板
            this.setState({
                table:<PublicTempTable/>,
                text:'公共模板',
                link:'#/cate/template'
            })
        }else if(type=='VC_transVersion'){
            //VC下的交易模板
            this.setState({
                table:<TransTempTable/>,
                text:'交易模板',
                link:'#/cate/template'
            })
        }else if(type=='VS_transVersion'){
            //VS下交易模板版本号  下面的模板列表
            this.setState({
                table:<TransTempList/>,
                text:'版本号 ',
                link:'#/cate/template'
            })
        }else if(type=='VS_reponse'){
            //VS下交易模板版本号  下面的模板列表  下面的模板
            this.setState({
                table:<PublicTempTable/>,
                text:'交易模板 ',
                link:'#/cate/template'
            })
        }
    }
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: this.state.text, link: this.state.link },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            <Row className="demo-row">
                <Col span="4" className="demo-col-left">
                    <TreeSearchLocal onSelect={this.onSelect.bind(this)} ref={el => this.treeElement = el} treeData={treeData} />
                </Col>
                <Col span="20" className="demo-col-inset">
                    {this.state.table}
                </Col>
            </Row>
        </div>
        );
    }
}
