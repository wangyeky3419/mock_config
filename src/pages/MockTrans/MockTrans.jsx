import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import MockTransTable from './components'
import './MockTrans.scss';
export default class MockTrans extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
   
    render() {
        const breadcrumb = [
            { text: '分类管理', link: '' },
            { text: '仿真交易管理', link: '#/cate/mockTrans' },
        ];
        return (
        <div className="cate-list-page">
            <CustomBreadcrumb dataSource={breadcrumb} />
            <MockTransTable/>
        </div>
        );
    }
}
