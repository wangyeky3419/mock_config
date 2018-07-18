

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import Table from './components/Table';
import Table1 from './components/Table.1';
import TreeSearch from '../../components/TreeSearch';
import { Grid } from "@icedesign/base";
import './MockEnvironment.scss';
const { Row, Col } = Grid;

export default class MockEnvironment extends Component {
    static displayName = 'CateMockEnvironment';
    
    constructor(props) {
        super(props);
        this.state = {
            table:''
        };
    }
    onSelect(selectedKeys,extra) {
        console.log(11122)
        if(selectedKeys[0]=='0-0'){
            this.setState({
                table:<Table/>
            })
        }else{
            this.setState({
                table:<Table1/>
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
            <Row className="demo-row">
                <Col span="4" className="demo-col-left">
                    <TreeSearch onSelect={this.onSelect.bind(this)}/>
                </Col>
                <Col span="20" className="demo-col-inset">
                    {this.state.table}
                </Col>
            </Row>
        </div>
        );
    }
}
