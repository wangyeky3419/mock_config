import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import { Grid, Tab, Input, Select, Button, Feedback, Loading, Dialog } from '@icedesign/base';
const { Row, Col } = Grid;
import SingleCaseTableReq from './components/SingleCaseTableReq';
import SingleCaseTableRsp from './components/SingleCaseTableRsp';
import TreeSearchLocal from '../../components/TreeSearchLocal';
import CaseDetail from './components/CaseDetail';
import CaseSave from './components/CaseSave';
import * as action from '../../utils/commonFn';
import './SingleCase.scss';
import { json } from 'graphlib';
const Toast = Feedback.toast;
const TabPane = Tab.TabPane;
const caseSource = [
    {
        label:'案例1',
        value:'1'
    },
    {
        label:'案例2',
        value:'2'
    }
]
let treeData = [
    {"id":"IT","name":"IT测试环境","pId":"0","envCode":"IT","type":"env"},
    {"id":"IT_COBP","name":"交易银行业务枢纽","pId":"IT","code":"COBP","envCode":"IT","type":"system"},
    {"id":"IT_COBP_1.0","name":"1.0","pId":"IT_COBP","code":"1.0","envCode":"IT","type":null},
    {"id":"IT_COBP_1.0_VC","name":"仿真客户端","pId":"IT_COBP_1.0","code":"249","mockType":"VC","envCode":"IT","systemId":"249","type":"VC","version":"1.0","systemCode":"COBP"},
    {"id":"IT_COBP_1.0_VC_C02990131_1.1","name":"地区信息查询@1.1","pId":"IT_COBP_1.0_VC","code":"1.1","mockType":"VC","envCode":"IT","systemId":"44","transCode":"C02990131","type":"trans","systemCode":"COBP"}
]
//强制解除两个对象间关联关系，这样一个修改了，另一个就没影响
let treeDataOld = JSON.parse(JSON.stringify(treeData));
var selNode = '';
var type = '';
export default class SingleCase extends Component{
    constructor(props){
        super(props);
        this.state={
            table:'',
            caseData:{}
        };
        treeData = action.toTreeData(treeData)
    }
    //tab页切换
    onTabChange(key){
        console.log(key)
    }
    onSelect = (selectedKeys,extra) => {
        //封装的方法
        selNode = action.getSelectNode(treeDataOld,selectedKeys[0]);
        //树节点第二次点击为取消选中，这时复用上一次的type
        type = selNode ? selNode.type : type;
        if(type=='trans'){
            //VC/VS下的公共模板
            this.setState({
                table:(
                    <div>
                        <div>
                            <Select dataSource={caseSource} hasClear style={{width:'200px',marginLeft:'20px'}} onChange={this.selectChange.bind(this)} placeholder="请选择案例"/>
                            <div style={{verticalAlign:'top',display:'inline-block',marginTop:'2px'}}>
                                <Button type="primary" size="small" onClick={() => this.onDetail()} style={{marginLeft:'8px'}}>案例详情查看</Button>
                                <Button type="primary" size="small" onClick={() => this.onSend()} style={{marginLeft:'4px'}}>发送</Button>
                                <Button type="primary" size="small" onClick={() => this.onSave()} style={{marginLeft:'4px'}}>保存</Button>
                                <Button type="primary" size="small" onClick={() => this.onEdit()} style={{marginLeft:'4px'}}>编辑SQL</Button>
                            </div>
                        </div>
                        <Row className="demo-row">
                            <Col span="12">
                                <Tab size="small" onChange={this.onTabChange.bind(this)}>
                                    <TabPane key="reqList" tab="请求列表">
                                        <SingleCaseTableReq/>
                                    </TabPane>
                                    <TabPane key="reqMsg" tab="请求报文">
                                        <Input multiple  placeholder="请求报文" maxLength={100} style={styles.area}  rows={25}/>
                                    </TabPane>
                                </Tab>
                            </Col>
                            <Col span="12">
                                <Tab size="small">
                                    <TabPane key="rspList" tab="响应列表">
                                    <div style={{borderLeft:'1px solid #CCC',marginLeft:'-16px'}}>
                                        <SingleCaseTableRsp/>
                                    </div>
                                    </TabPane>
                                    <TabPane key="rspMsg" tab="响应报文">
                                        <Input multiple  placeholder="响应报文" maxLength={200} style={styles.area}  rows={25}/>
                                    </TabPane>
                                </Tab>
                            </Col>
                        </Row>
                    </div>
                ),
                text:'公共模板',
                link:'#/cate/template'
            })
        }else{
            this.treeElement.expendNode(selectedKeys)
        }
    }
    //案例选择
    selectChange(value,option){
        this.setState({
            caseData:option
        })
        
    }
    onDetail(){
        if(JSON.stringify(this.state.caseData)=='{}'){
            //没选择案例情况下
            Toast.prompt('请选择一个案例')
        }else{
            //弹出案例
            this.caseElement.onCaseOpen()
        }
    }
    onSend(){
        Dialog.confirm({
            content: "确定要发送此案例吗？",
            title: "是否发送",
            onOk: () => {
                Toast.success("发送成功");
            }
        });
    }
    onEdit(){

    }
    onSave(){
        if(JSON.stringify(this.state.caseData)=='{}'){
            //没选择案例情况下是创建案例
            var isSelect = 1
        }else{
            //选择案例情况下为更新和创建
            var isSelect = 0
        }
        this.caseSaveElement.onCaseOpen({'case':'案例1','id':'2'},isSelect)
    }
    render(){
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '报文测试', link: '#/cate/SingleCase' },
        ];
        return(
            <div className="cate-list-page">
                <CustomBreadcrumb dataSource={breadcrumb} />
                <Row className="demo-row">
                    <Col span="4" className="single-left">                       
                        <TreeSearchLocal onSelect={this.onSelect.bind(this)} treeData={treeData} ref={el => this.treeElement = el}/>
                    </Col>
                    <Col span="20" className="single-right">
                       {this.state.table}
                       <CaseDetail ref={el => this.caseElement = el}/>
                       <CaseSave ref={el => this.caseSaveElement = el}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
const styles = {
    area:{
        width:'100%'
    }
}