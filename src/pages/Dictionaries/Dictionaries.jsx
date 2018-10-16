import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import { Grid } from '@icedesign/base';
const { Row, Col } = Grid;
import DictChildTable from './components/DictChildTable';
import DictMainTable from './components/DictMainTable';
import './Dictionaries.scss';
export default class Dictionaries extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    clickRow = (values) =>{
        this.childElement.setCode(values)
    }
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '数据字典管理', link: '#/cate/dictionaries' },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            <Row className="demo-row">
                <Col span="12">
                   <DictMainTable clickRow={this.clickRow}/>
                </Col>
                <Col span="12" style={{paddingLeft:'5px'}}>
                    <DictChildTable ref={el => this.childElement = el}/>
                </Col>
            </Row>
        </div>
        );
    }
}
