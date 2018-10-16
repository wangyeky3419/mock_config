
import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import SystemTable from './components/SystemTable';
import SystemVersionTable from './components/SystemVersionTable';
import TransTable from './components/TransTable';
import TreeSearch from './components/TreeSearch';
import { Grid, Feedback } from "@icedesign/base";
import './MockEnvironment.scss';
const { Row, Col } = Grid;
const Toast = Feedback.toast;
export default class MockEnvironment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table:'',
            treeData:[]
        };
    }
    componentDidMount(){
      
    }
    onSelect(type,id) {
        console.log(type)
        if(type=='env'){
            this.setState({
                table:<SystemTable/>
            })
        }else if(type=='system'){
            this.setState({
                table:<SystemVersionTable/>
            })
        }else if(type=='VC'||type=='VS'){
            this.setState({
                table:<TransTable/>
            })
        }
    }
   
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '环境管理', link: '#/cate/mockEnvironment' },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            {/* <Row className="demo-row" type="fluid">
                <Col span="4" className="demo-col-left" style={{borderTopLeftRadius: '3px',borderBottomLeftRadius: '3px'}}>
                   
                    <TreeSearch onSelect={this.onSelect.bind(this)} treeData={this.state.treeData} ref={el => this.treeElement = el}/>
                </Col>
                <Col span="20" className="demo-col-inset">
                    {this.state.table}
                </Col>
            </Row> */}
            <div>
                <div style={{display:'inline-block',width:'15%',background:'#fff',float:'left',padding:'10px'}}>
                    <TreeSearch onSelect={this.onSelect.bind(this)} treeData={this.state.treeData} ref={el => this.treeElement = el}/>
                </div>
                <div style={{display:'inline-block',width:'80%',background:'#fff',height:'500px',float:'left'}}>
                    {/* {this.state.table} */}
                    你好
                </div>
            </div>
        </div>
        );
    }
}
